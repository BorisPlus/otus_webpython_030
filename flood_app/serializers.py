from rest_framework import serializers
from . import models

from core_app.serializers import UserSerializerWithToken


class MessageSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(
        read_only=True
    )

    class Meta:
        model = models.Message
        fields = ('owner', 'text', 'created_at')  # '__all__'
        read_only_fields = ('owner', 'created_at',)

    def to_representation(self, instance):
        self.fields['user'] = UserSerializerWithToken(read_only=True)
        return super(MessageSerializer, self).to_representation(instance)


class ChatSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(
        read_only=True
    )

    class Meta:
        model = models.Chat
        fields = ('id', 'owner', 'name', 'created_at')
        read_only_fields = ('id', 'owner', 'created_at',)

    def to_representation(self, instance):
        self.fields['user'] = UserSerializerWithToken(read_only=True)
        return super(ChatSerializer, self).to_representation(instance)


class ChatMessageSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(
        read_only=True
    )
    chat = serializers.StringRelatedField(
        read_only=True
    )

    class Meta:
        model = models.ChatMessage
        fields = ('text', 'created_at', 'owner', 'chat',)  # '__all__'
        read_only_fields = ('chat', 'owner', 'created_at',)

    def to_representation(self, instance):
        self.fields['user'] = UserSerializerWithToken(read_only=True)
        self.fields['chat'] = ChatSerializer(read_only=True)
        return super(ChatMessageSerializer, self).to_representation(instance)

