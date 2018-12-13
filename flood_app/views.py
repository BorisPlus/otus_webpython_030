from . import models
from . import serializers
from rest_framework import generics


# ListAPIView
class MessageList(generics.ListCreateAPIView):
    queryset = models.Message.objects.order_by('-created_at').all()
    serializer_class = serializers.MessageSerializer


class MessageListCreate(generics.ListCreateAPIView):
    queryset = models.Message.objects.order_by('-created_at').all()
    serializer_class = serializers.MessageSerializer
