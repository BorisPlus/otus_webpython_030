from . import views

from django.urls import path
urlpatterns = [
    path('message/list', views.MessageList.as_view()),
    path('message/create', views.MessageListCreate.as_view()),
    path('', views.MessageList.as_view())
]
