from django.contrib import admin
# Register your models here.
from . import models


@admin.register(models.Message)
class MessageAdminModel(admin.ModelAdmin):
    list_display = (
        'id',
        'created_at',
        'owner',
        'text'
    )


@admin.register(models.Chat)
class ChatAdminModel(admin.ModelAdmin):
    list_display = (
        'id',
        'created_at',
        'owner',
        'name'
    )


@admin.register(models.ChatMessage)
class ChatMessageAdminModel(admin.ModelAdmin):
    list_display = (
        'id',
        'chat',
        'created_at',
        'owner',
        'text'
    )
