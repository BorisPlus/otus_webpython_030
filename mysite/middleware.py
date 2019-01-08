from django.contrib.auth.middleware import get_user
from django.utils.functional import SimpleLazyObject
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
# from rest_framework.exceptions import AuthenticationFailed


class JWTAuthenticationMiddleware(object):
    """
    Replacement for django session auth get_user & auth.get_user
     JSON Web Token authentication. Inspects the token for the user_id,
     attempts to get that user from the DB & assigns the user on the
     request object. Otherwise it defaults to AnonymousUser.

    This will work with existing decorators like LoginRequired  ;)

    Returns: instance of user object or AnonymousUser object
    """
    def __init__(self, process_request):
        self.process_request = process_request

    def __call__(self, request):
        # https://stackoverflow.com/questions/24784985/i-have-a-middleware-where-i-a-want-to-log-every-request-response-how-can-i-acce
        # https://stackoverflow.com/questions/49311434/django-middleware-advised-not-to-use-request-post-why
        request._jwt_user = SimpleLazyObject(lambda: self.__class__.get_jwt_user(request))
        #
        request.user = SimpleLazyObject(lambda: self.__class__.get_jwt_user(request))
        return self.process_request(request)

    @staticmethod
    def get_jwt_user(request):
        user = get_user(request)
        if user.is_authenticated:
            return user
        jwt_authentication = JSONWebTokenAuthentication()
        if jwt_authentication.get_jwt_value(request):
            user, jwt = jwt_authentication.authenticate(request)
        return user
