from django.urls import path
from .import views

urlpatterns = [
    path('register/', views.CreateUserView),
    path('login/', views.LoginView.as_view()),
    path('resetpassword/', views.ResetPasswordView.as_view()),
    path('forgetpassword/', views.forgot_password),
    path('get_user/',views.get_user),
]
