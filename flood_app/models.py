from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
