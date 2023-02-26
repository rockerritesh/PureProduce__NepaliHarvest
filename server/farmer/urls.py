from django.urls import path
from . import views

urlpatterns = [
    path('become_farmer/', views.become_farmer, name='become_farmer'),
]
