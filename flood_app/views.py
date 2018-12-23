from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from . import serializers
from . import models


@authentication_classes([])
@permission_classes([])
class MessageList(generics.ListAPIView):
    queryset = models.Message.objects.order_by('-created_at').all()
    serializer_class = serializers.MessageSerializer


@authentication_classes([])
@permission_classes([])
class ChatList(generics.ListAPIView):
    queryset = models.Chat.objects.order_by('-created_at').all()
    serializer_class = serializers.ChatSerializer


@authentication_classes([])
@permission_classes([])
class MessageCreate(APIView):
    # allowed_methods = {'POST'}

    def post(self, request):
        # if not request.user.is_authenticated:
        #     return Response({"error": "User is not authenticated"},
        #                     status=status.HTTP_511_NETWORK_AUTHENTICATION_REQUIRED)
        try:
            owner = User.objects.get(pk=request.data.get('owner_id', 0))
        except User.DoesNotExist:
            # TODO: как в React получить данные из переданного в 'data'
            return Response(data={"error": "Owner does not exists."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data["owner_id"] = owner.pk
            measurement = serializer.save()
            if not measurement:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # raise Exception('Exception of MessageSerializer.save()')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_409_CONFLICT)


@authentication_classes([])
@permission_classes([])
class ChatCreate(APIView):
    def post(self, request):
        try:
            owner = User.objects.get(pk=request.data.get('owner_id', 0))
        except User.DoesNotExist:
            # TODO: как в React получить данные из переданного в 'data'
            return Response(data={"error": "Owner does not exists."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data["owner_id"] = owner.pk
            measurement = serializer.save()
            if not measurement:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_409_CONFLICT)
