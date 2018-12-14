from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
# from . import views

urlpatterns = [
    # path('token-auth/', views.CustomObtainAuthToken.as_view()),  # I WANNA USER ID!!!!!
    path('token-auth/', obtain_jwt_token),
    # path('auth/', obtain_jwt_token),
    # path('token-auth/', obtain_jwt_token),
    path('core_app/', include('core_app.urls')),
    path(r'api/ver.0/', include('flood_app.urls')),
    path('', admin.site.urls),
]
