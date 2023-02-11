from django.shortcuts import render
from django.http import JsonResponse
from .models import predict, label
import tempfile


def predict_image(request):
    if request.method == "POST":
        image = request.FILES["image"].read()
        with tempfile.NamedTemporaryFile(suffix=".jpg") as temp_file:
            temp_file.write(image)
            label_num = predict(image_path = temp_file.name)
        prediction = label(label_num)
        return JsonResponse({"prediction": prediction})