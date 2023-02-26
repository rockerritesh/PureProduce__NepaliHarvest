from django.urls import path
from .views import UserRegistrationView,UserLoginView, UserProfileView, UserChangePasswordView,\
    SendPasswordResetEmailView, UserPasswordResetView,UserProfileUpdateView,SuperuserCreateView,GetAllUsersView,GetActiveUsersView,BecomeFarmerView,UserUpdateAPIView,UserDeleteAPIView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('update/', UserProfileUpdateView.as_view(), name='update'),
    path('createsuperuser/', SuperuserCreateView.as_view(), name='superuser'),
    path('updateadmin/<int:user_id>/', UserUpdateAPIView.as_view(), name='updateanyuserthroughadmin'),
    path('deleteuser/<int:user_id>/', UserDeleteAPIView.as_view(), name='delete_user'),
    path('allusers/', GetAllUsersView.as_view(), name='allusers'),
    path('farmer/', GetActiveUsersView.as_view(), name='farmers'),
    path('becomefarmer/', BecomeFarmerView.as_view(), name='becomefarmer'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/',SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
]