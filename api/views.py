from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, UserPasswordResetSerializer,UserUpdateSerializer
from .serializers import UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UpdateUserProfileSerializer,SuperuserCreateSerializer,UserSerializer
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta
from rest_framework import generics
from .permissions import IsAdminUser
from .models import User

# generate tokens manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh.access_token.set_exp(lifetime=timedelta(days=60))

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create your views here.
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'registration success'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileUpdateView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def patch(self, request, format=None):
        serializer = UpdateUserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':"User Updated Successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    # only authenticated user can access
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Changed Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset link Send. Please Check your Email'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, uid, token,  format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={'uid': uid, 'token': token})
        if serializer.isvalid(raise_exception=True):
            return Response({'msg': 'Password Reset Successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Superuser
class SuperuserCreateView(generics.CreateAPIView):
    permission_classes = [IsAdminUser]
    def post(self, request, format=None):
        serializer = SuperuserCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, "msg":"Admin Created Successfully"}, status=status.HTTP_201_CREATED)
    

class GetAllUsersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        all_users = User.objects.all()
        serializer = UserSerializer(all_users, many=True)
        return Response(serializer.data)

class GetActiveUsersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        active_users = User.objects.filter(status='active', is_admin=False)
        serializer = UserSerializer(active_users, many=True)
        return Response(serializer.data)


class BecomeFarmerView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, *args, **kwargs):
        active_users = User.objects.filter(status='inactive', is_admin=False, phone_number__gte=10, citizenship_id_number__gte=2)
        serializer = UserSerializer(active_users, many=True)
        return Response(serializer.data)

class UserUpdateAPIView(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_url_kwarg = 'user_id'

    def put(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        user_data = request.data
        new_status = user_data.get('status', user.status)
        if new_status == 'inactive':
            user.status = "active"
        user.save()
        serializer = self.get_serializer(user)
        return Response({'message': 'User Status was updated'}, status=status.HTTP_200_OK)

class UserDeleteAPIView(generics.DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    lookup_url_kwarg = 'user_id'

    def delete(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response({'msg':"User deleted Successfully"},status=status.HTTP_204_NO_CONTENT )