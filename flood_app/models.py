from django.db import models
from django.contrib.auth.models import User


class Chat(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{name} ({owner})'.format(
            name=self.name,
            owner=self.owner
        )


class ChatMessage(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)


class Access(models.Model):
    class Meta:
        unique_together = (('user', 'chat'),)
        ordering = ('-user', '-rank_order', '-chat',)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    rank_order = models.PositiveIntegerField(blank=False, null=False, default=1)

    def __str__(self):
        return '{user} access to "{chat}"'.format(
            user=self.user,
            chat=self.chat
        )
