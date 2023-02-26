from django.db import models

class Farmer(models.Model):
    image = models.ImageField(upload_to='farmer/seller_images/')
    phone_number = models.CharField(max_length=20)
    id_image = models.ImageField(upload_to='farmer/seller_id_images/')
    id_number = models.CharField(max_length=50)
