from django import forms
from .models import Product, Comment1

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['title', 'description','category', 'price', 'quantity', 'image']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 3}),
            'image': forms.ClearableFileInput(attrs={'multiple': True}),
        }

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment1
        fields = ('product_id', 'body',"rating")