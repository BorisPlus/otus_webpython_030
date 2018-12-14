from . import models
from . import serializers
from rest_framework import generics
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from django.contrib.auth.models import User


# ListAPIView
@authentication_classes([])
@permission_classes([])
class MessageList(generics.ListAPIView):
    queryset = models.Message.objects.order_by('-created_at').all()
    serializer_class = serializers.MessageSerializer


class MessageListCreate(generics.ListCreateAPIView):
    allowed_methods = {'POST'}
    queryset = models.Message.objects.order_by('-created_at').all()
    serializer_class = serializers.MessageSerializer


# @api_view(['POST'])
# def profile_create(request):
#   serializer = ProfileSerializer(data=request.data)
#   if serializer.is_valid():
#     serializer.save()
#     return JsonResponse(serializer.data, status = status.HTTP_201_CREATED)
#   return JsonResponse(serializer.errors , status= status.HTTP_400_BAD_REQUEST
#
# )

from django.http import Http404
from . import serializers
from rest_framework.response import Response


class MessageCreate(APIView):
    def get(self, request):
        print(request)
        # do stuff with get
        return Response(data="return msg or data")

    def post(self, request):
        print(request.data)
        post_data = request.data
        # do something with `post_data`
        return Response(data="return msg or data")
        #
        # def post(self, request):
        #     # owner = get_object_or_404(User, pk=user_id)
        #     print(request)
        #     print(request.owner_id)
        #     try:
        #         owner = User.objects.get(pk=request.owner_id)
        #     except User.DoesNotExist:
        #         raise Http404("Owner does not exists.")
        #
        #     serializer = serializers.MessageSerializer(data=request.data)
        #     if serializer.is_valid():
        #         serializer.validated_data["owner_id"] = user_id
        #         measurement = serializer.save()
        #         if not measurement:
        #             raise Exception('Exception of MessageSerializer.save()')


class XViewSet(ViewSet):
    renderer_classes = ''

    def create(self, request):  # Here is the new update comes <<<<
        post_data = request.data
        # do something with post data
        return Response(data="return data")

    # def retrieve(self, request, pk=None):
    #     # your code
    #
    #     return Response(serialized_data, status=status.HTTP_200_OK)
    #
    # def list(self, request):
    #     # your code
    #     return resp
