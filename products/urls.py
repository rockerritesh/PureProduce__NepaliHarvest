from django.urls import path
from . import views
urlpatterns = [
    path('add/', views.add_product, name='add_product'),
    path('add_comment/', views.add_comment, name='add_comment'),
]
