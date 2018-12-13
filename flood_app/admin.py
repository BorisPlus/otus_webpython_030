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
