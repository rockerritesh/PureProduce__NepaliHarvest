from rest_framework import serializers
from .models import Product, Comment1

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment1
        fields = ('name', 'body','rating', 'created_on')

class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'price', 'category', 'image', 'quantity', 'description', 'uploaded_by', 'comments', "created_at")
    
class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', "category",'image',"quantity","description","price" ]
        read_only_fields = ['id']

from rest_framework import serializers
from .models import Cart1

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart1
        fields = ['id', 'user', 'product', 'quantity']

