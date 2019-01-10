from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from . import serializers
from . import models
from django.db.models import Q


@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
class Chat(APIView):

    def get(self, request, *args, **kwargs):
        user = request.user
        chat_id = kwargs['chat_id']
        if user.is_superuser:
            obj = models.Chat.objects.get(pk=chat_id)
        else:
            obj = models.Chat.objects.filter(
                Q(owner=user) |
                Q(access__user=user)
            ).get(pk=chat_id)
        serializer = serializers.ChatSerializer(obj)
        return Response(serializer.data)


@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
class ChatList(generics.ListAPIView):
    serializer_class = serializers.ChatSerializer

    def get_queryset(self):
        # user = self.request.__dict__.get('_jwt_user', self.request.user)
        user = self.request.user
        # print('ChatList.get_queryset _jwt_user = "%s"' % jwt_user)
        if user.is_superuser:
            return models.Chat.objects.order_by('name').all()
        return models.Chat.objects.filter(
            Q(owner=user) |
            Q(access__user=user)
        ).order_by('access__rank_order', 'name').all()


@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
class ChatCreate(APIView):
    def post(self, request):
        # try:
        #     owner = User.objects.get(pk=request.data.get('owner_id', 0))
        # except User.DoesNotExist:
        #     TODO: как в React получить данные из переданного в 'data'
        # return Response(data={"error": "Owner does not exists."}, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data["owner_id"] = request.user.pk
            measurement = serializer.save()
            if not measurement:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_409_CONFLICT)


@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
class ChatMessageList(generics.ListAPIView):
    serializer_class = serializers.ChatMessageSerializer

    def get_queryset(self):
        # print('ChatMessageList.get_queryset _jwt_user = "%s"' % self.request._jwt_user)
        chat_id = self.kwargs['chat_id']
        return models.ChatMessage.objects.filter(chat_id=chat_id).order_by('-created_at')


@authentication_classes([])
@permission_classes([])
class ChatMessageCreate(generics.ListCreateAPIView):
    """
    Не могу застаить request.user быть не Anonymous
    Поэтому приходится передавать owner_id и дергать его как
    owner = models.User.objects.get(pk=request.data.get('owner_id', 0))
    Замечание:
    Профиксил через request._jwt_user ....
    """
    serializer_class = serializers.ChatMessageSerializer

    def post(self, request, **kwargs):
        # user = self.request.__dict__.get('_jwt_user', self.request.user)
        user = self.request._jwt_user
        try:
            chat = models.Chat.objects.get(pk=kwargs.get('chat_id', 0))
        except models.Chat.DoesNotExist:
            # TODO: как в React получить данные из переданного в 'data'
            return Response(data={"error": "Chat does not exists."}, status=status.HTTP_404_NOT_FOUND)

        tmp_data = request.data.copy()
        tmp_data['chat_id'] = chat.pk
        tmp_data['owner_id'] = user.pk
        serializer = serializers.ChatMessageSerializer(data=tmp_data)
        if serializer.is_valid():
            serializer.validated_data["owner_id"] = user.pk
            serializer.validated_data["chat_id"] = chat.pk
            measurement = serializer.save()
            if not measurement:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_409_CONFLICT)
