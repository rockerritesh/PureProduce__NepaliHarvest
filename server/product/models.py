from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255)
    image = models.ImageField(upload_to='products/')
    quantity = models.PositiveIntegerField()
    description = models.TextField()

    def __str__(self):
        return self.title


class Comment(models.Model):
    product_id = models.CharField(max_length=80)
    name = models.CharField(max_length=80)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']
