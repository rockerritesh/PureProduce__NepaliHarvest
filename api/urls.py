from django.urls import path
from .views import UserRegistrationView,UserLoginView, UserProfileView, UserChangePasswordView,\
    SendPasswordResetEmailView, UserPasswordResetView,UserProfileUpdateView,SuperuserCreateView,GetAllUsersView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('update/', UserProfileUpdateView.as_view(), name='update'),
    path('createsuperuser/', SuperuserCreateView.as_view(), name='superuser'),
    path('allusers/', GetAllUsersView.as_view(), name='allusers'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
]