from core_app.serializers import UserSerializer
from rest_framework_jwt.settings import api_settings


def jwt_response_handler(token, user=None, request=None):
    user = UserSerializer(user, context={'request': request}).data

    jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
    jwt_payload_get_user_id_handler = api_settings.JWT_PAYLOAD_GET_USER_ID_HANDLER

    payload = jwt_decode_handler(token)
    user_id = jwt_payload_get_user_id_handler(payload)

    return {
        'token': token,
        'user_id': user_id,
        'username': user.get('username', None)
    }
