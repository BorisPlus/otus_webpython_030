from django.contrib import admin
from . import models
import sys
import os
sys.path.insert(1, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from django_admin_features.django_model_admin_custom_field_decorators import html as my_decorators


class AccessInline(admin.TabularInline):
    model = models.Access
    extra = 1


@admin.register(models.Chat)
class ChatAdminModel(admin.ModelAdmin):
    inlines = (
        AccessInline,
    )
    list_display = (
        'id',
        'created_at',
        'owner',
        'name',
        'user_list'
    )

    # order_by('-access_rank_order')
    @my_decorators.fail_on_empty()
    @my_decorators.ul_li()
    def user_list(self, obj):
        return [(access.user,) for access in obj.access_set.all()]
        # return [access.user for access in obj.access_set.all()]

    user_list.short_description = 'Users'


@admin.register(models.ChatMessage)
class ChatMessageAdminModel(admin.ModelAdmin):
    list_display = (
        'id',
        'chat',
        'created_at',
        'owner',
        'text'
    )
