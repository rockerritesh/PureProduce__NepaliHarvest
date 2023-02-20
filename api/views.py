from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.views import View
from django.http import JsonResponse
import jwt
import json
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import bcrypt
from django.utils import timezone
import datetime
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.shortcuts import render
import crypto
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
JWT_SECRET = 'secret-key'


@csrf_exempt
def CreateUserView(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode())
        email = data.get('email')
        name = data.get('name')
        password = data.get('password')

        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)
        if not name:
            return JsonResponse({'error': 'Name is required'}, status=400)
        if len(name) < 3:
            return JsonResponse({'error': 'Name must have at least 3 characters'}, status=400)
        if not password:
            return JsonResponse({'error': 'Password is required'}, status=400)
        if len(password) < 5:
            return JsonResponse({'error': 'Password must have at least 5 characters'}, status=400)
        
        try:
            user = User.objects.get(email=email)
            return JsonResponse({'error': 'Sorry a user with this email already exists'}, status=400)
        except User.DoesNotExist:
            hashed_password = make_password(password)
            user = User.objects.create(email=email, name=name, password=hashed_password)
            payload = {
                'user_id': user.id,
            }
            token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')#.decode('utf-8')
            return JsonResponse({'token': token})

class LoginView(View):
    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        if not email or not password:
            return JsonResponse({'error': 'Please enter a valid email and password'})

        user = authenticate(email=email, password=password)
        if not user:
            return JsonResponse({'error': 'Please enter correct credentials'})
        
        login(request, user)
        data = {
            'user': {
                'id': user.id,
            }
        }
        auth_token = jwt.encode(data, JWT_SECRET, algorithm='HS256')
        return JsonResponse({'success': True, 'auth_token': auth_token})
User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class ResetPasswordView(View):
    def post(self, request, token):
        try:
            user = User.objects.get(reset_token=token, reset_expiration__gt=timezone.now())
            if not user:
                return JsonResponse({'error': 'Invalid token'})

            salt = bcrypt.gensalt()
            password = request.POST.get('password')
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
            user.password = hashed_password
            user.reset_token = None
            user.reset_expiration = None
            user.save()

            return JsonResponse({'success': 'Your password has been reset successfully'})
        except Exception as e:
            return JsonResponse({'error': 'An error occurred'})


def forgot_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = User.objects.get(email=email)
            if not user:
                return render(request, 'forgot_password.html', {'error': 'User not found'})

            reset_token = crypto.randomBytes(20).hex()
            reset_expiration = timezone.now() + datetime.timedelta(hours=1)
            user.reset_token = reset_token
            user.reset_expiration = reset_expiration
            user.save()

            subject = 'Password reset'
            message = f'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n http://localhost:5000/api/auth/resetpassword/{reset_token}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n'
            from_email = 'iamheretoresetemail@gmail.com'
            recipient_list = [email]

            send_mail(subject, message, from_email, recipient_list)
            return render(request, 'forgot_password.html', {'message': f'An e-mail has been sent to {email} with further instructions.'})
        except User.DoesNotExist:
            return render(request, 'forgot_password.html', {'error': 'User not found'})
    return render(request, 'forgot_password.html')



@require_http_methods(["POST"])
@login_required
def get_user(request):
    try:
        user = request.user
        return JsonResponse({'user': {'id': user.id, 'email': user.email, 'name': user.name}})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)