from django.db import models
from api.models import User

class Comment1(models.Model):
    product_id = models.CharField(max_length=80)
    name = models.CharField(max_length=80)
    body = models.TextField()
    rating=models.PositiveIntegerField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']
        
class Product(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products/')
    created_at = models.DateTimeField(auto_now_add=True)
    quantity = models.PositiveIntegerField()
    description = models.TextField()
    uploaded_by = models.CharField(max_length=255, default="")
    comments = models.ManyToManyField(Comment1, related_name='product_comments')
    def __str__(self):
        return self.title

class Cart1(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.user.name} - {self.product.title}'




