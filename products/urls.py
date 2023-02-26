from django.urls import path
from .views import AddProductView,CommentView,ProductListView, ProductDeleteView, ProductUpdateView,FarmerProductListView,AddToCartView,CartListView,CartDeleteView


urlpatterns = [
    path('add/', AddProductView.as_view(), name='addproduct'),
    path('fetchproduct/', ProductListView.as_view(), name='fetchproduct'),
    path('fetchfarmerproduct/', FarmerProductListView.as_view(), name='fetchfarmerproduct'),
    path('addcomment/', CommentView.as_view(), name='addcomment'),
    path('<int:pk>/delete/', ProductDeleteView.as_view(), name='product-delete'),
    path('<int:pk>/update/', ProductUpdateView.as_view(), name='product-update'),
    path('cart/add/', AddToCartView.as_view(), name='add_to_cart'),
    path('cart/', CartListView.as_view(), name='cart-list'),
    path('cart/<int:pk>/', CartDeleteView.as_view(), name='cart-delete'),
    
] 