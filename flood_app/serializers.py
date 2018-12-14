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
