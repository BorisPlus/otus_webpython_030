from . import views


from django.urls import path
urlpatterns = [
    path('chat/list', views.ChatList.as_view()),
    path('chat/create', views.ChatCreate.as_view()),
    path('message/list', views.MessageList.as_view()),
    path('message/create', views.MessageCreate.as_view()),
    path('chat/<int:chat_id>/message/list', views.ChatMessageList.as_view()),
    path('chat/<int:chat_id>/message/create', views.ChatMessageCreate.as_view()),
    path('', views.MessageList.as_view())
]
