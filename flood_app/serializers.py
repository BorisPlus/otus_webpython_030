from rest_framework import serializers
from . import models

from core_app.serializers import UserSerializerWithToken


class ChatSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = models.Chat
        fields = ('id', 'owner', 'owner_id', 'name', 'created_at')
        read_only_fields = ('id', 'owner', 'owner_id', 'created_at',)

    def to_representation(self, instance):
        self.fields['user'] = UserSerializerWithToken(read_only=True)
        return super(ChatSerializer, self).to_representation(instance)


class ChatMessageSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    chat = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = models.ChatMessage
        fields = ('text', 'created_at', 'owner', 'owner_id', 'chat',)
        read_only_fields = ('chat', 'owner', 'owner_id', 'created_at',)

    def to_representation(self, instance):
        self.fields['user'] = UserSerializerWithToken(read_only=True)
        self.fields['chat'] = ChatSerializer(read_only=True)
        return super(ChatMessageSerializer, self).to_representation(instance)
