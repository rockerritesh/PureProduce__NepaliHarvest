from django.db import models
# Create your views here.
import numpy as np
import pandas as pd
from pathlib import Path
import os.path
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import pickle

# Create your models here.
model = tf.keras.models.load_model('objectdect/model_bin/model.h5')

def predict(image_path,model = model):
    img = image.load_img(image_path, target_size=(224,224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = tf.keras.applications.mobilenet_v2.preprocess_input(x)

    # Get the prediction for the image
    predictions = model.predict(x)

    # Get the class with the highest predicted probability
    predicted_class = np.argmax(predictions)

    return predicted_class

def label(predicted_class):
    labels_path = 'objectdect/model_bin/labels.pkl'
    # Loading the labels mapping
    with open(labels_path, "rb") as f:
        labels = pickle.load(f)
    return labels[predicted_class]
