from django.urls import path
from .views import current_user, CreateUserAPIView

urlpatterns = [
    path('create/', CreateUserAPIView.as_view()),
    path('current_user/', current_user),
]