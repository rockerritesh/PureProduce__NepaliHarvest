from rest_framework import serializers
from .models import User
from xml.dom import ValidationErr
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only= True)
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2']
        extra_kwargs = {
            'password' : {'write_only' : True}
        }
    
    #Validating Password and confirm password while registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        
        if password != password2:
            serializers.ValidationError("password and confirm password doesn't match")
        return attrs
    
    def create(self,validate_data):
        return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'profile_image', 'phone_number', 'citizenship_id_number',"citizenship_image","status","is_admin","updated_at"]

class UpdateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'profile_image', 'phone_number', 'citizenship_image', 'citizenship_id_number']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.citizenship_image = validated_data.get('citizenship_image', instance.citizenship_image)
        instance.citizenship_id_number = validated_data.get('citizenship_id_number', instance.citizenship_id_number)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email','profile_image', 'phone_number', 'citizenship_id_number',"citizenship_image","status","is_admin","updated_at")

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password', 'password2']
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            serializers.ValidationError("password and confirm password doesn't match")
        user.set_password(password)
        user.save()
        return attrs

class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255)
    class Meta:
        fields = 'email'
    
    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print('Encoded User id', uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Password reset token', token)
            link = 'http://localhost:3000/api/usr/reset'+uid+'/'+token
            print(f"Password reset link :{link}")
            #send email
            body = 'Click Following Link to Reset Your Password '+ link
            data = {
                'subject': 'Reset your password',
                'body': body,
                'to_email': user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise ValidationErr('You are not a registered user')

class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password', 'password2']
    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            
            if password != password2:
                serializers.ValidationError("password and confirm password doesn't match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = user.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is not valid or expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationErr('Token is not valid or expired')

#SuperUser
class SuperuserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    name = serializers.CharField()

    def create(self, validated_data):
        User = get_user_model()
        user = User.objects.create_superuser(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'is_active', 'is_admin', 'created_at', 'updated_at', 'profile_image', 'phone_number', 'citizenship_image', 'citizenship_id_number', 'status']
        read_only_fields = ['id', 'created_at', 'updated_at']