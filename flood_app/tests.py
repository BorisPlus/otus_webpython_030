from django.test import TestCase

# Create your tests here.
from . import models


def do_nothing():
    pass


def get_new_value():
    import datetime
    import pytz
    return datetime.datetime.now(pytz.timezone('UTC'))


class UserTestCase(TestCase):
    def test_user_exists(self):
        """User exists"""
        test_user, test_user_was_created = models.User.objects.get_or_create(username="test_user")
        self.assertIsNotNone(test_user)

    def test_was_new_created_recently(self):
        test_user, test_user_was_created = models.User.objects.get_or_create(username=get_new_value())
        self.assertTrue(test_user_was_created)


class ChatTestCase(TestCase):
    def test_chat_exists(self):
        """Chat exists"""
        test_user, was_created = models.User.objects.get_or_create(username="test_user")
        test_chat, was_created = models.Chat.objects.get_or_create(owner=test_user, name="test_chat")
        self.assertIsNotNone(test_chat)

    def test_chat_string_representation(self):
        """Chat exists"""
        test_user, test_user_was_created = models.User.objects.get_or_create(username="test_user")
        test_chat, test_chat_was_created = models.Chat.objects.get_or_create(owner=test_user, name="test_chat")
        self.assertEqual(
            str(test_chat),
            '{chat_name} ({chat_owner})'.format(
                chat_name=test_chat.name,
                chat_owner=test_chat.owner
            )
        )

    #

    def test_chat_string_representation_not_equal(self):
        other_user, other_user_was_created = models.User.objects.get_or_create(username="other_user")
        test_user, test_user_was_created = models.User.objects.get_or_create(username="test_user")
        test_chat, test_chat_was_created = models.Chat.objects.get_or_create(owner=test_user, name="test_chat")
        self.assertNotEqual(
            str(test_chat),
            '{chat_name} ({chat_owner})'.format(
                chat_name=test_chat.name,
                chat_owner=other_user
            )
        )

    def test_was_created_recently(self):
        import datetime
        import pytz
        test_user, test_user_was_created = models.User.objects.get_or_create(username="test_user")
        test_chat, test_chat_was_created = models.Chat.objects.get_or_create(owner=test_user, name=get_new_value())
        _now = datetime.datetime.now(pytz.timezone('UTC'))
        _timedelta = datetime.timedelta(seconds=5)
        # import sys
        # sys.stderr.write(repr(test_chat.created_at) + '\n')
        # sys.stderr.write(repr(_now) + '\n')
        # sys.stderr.write(repr(_timedelta) + '\n')
        # sys.stderr.write(repr(test_chat.created_at - _now) + '\n')
        # result = True if (test_chat.created_at - _now) <= _timedelta else False
        self.assertTrue((test_chat.created_at - _now) <= _timedelta and test_chat_was_created)


class LowLevelTestCase(TestCase):
    def setUp(self):
        from django.db import models as django_models
        self.models_for_test = {
            'User': {
                'username': (django_models.CharField,),
            },
            'Chat': {
                'name': (django_models.CharField,),
                'created_at': (django_models.DateTimeField,),
                'owner': (django_models.ForeignKey, models.User)
            },
            'ChatMessage': {
                'text': (django_models.CharField,),
                'created_at': (django_models.DateTimeField,),
                'owner': (django_models.ForeignKey, models.User),
                'chat': (django_models.ForeignKey, models.Chat)
            },
            'Access': {
                'rank_order': (django_models.PositiveIntegerField,),
                'user': (django_models.ForeignKey, models.User),
                'chat': (django_models.ForeignKey, models.Chat)
            },
        }

    def test_model_class_exists(self):
        import sys
        from django.db import models as django_models
        for model_class_name in self.models_for_test:
            sys.stdout.write('test model class name "%s" \n' % model_class_name)
            self.assertTrue(model_class_name in dir(models)
                            and callable(getattr(models, model_class_name))
                            and issubclass(getattr(models, model_class_name), django_models.Model))
            sys.stdout.write(' => OK \n')

    def test_model_class_fields_exists(self):
        import sys
        for model_class_name in self.models_for_test:
            sys.stdout.write('test model class name "%s" \n' % model_class_name)
            for model_class_field_name in self.models_for_test[model_class_name]:
                sys.stdout.write('  test model class "%s" field name "%s" \n' % (model_class_name, model_class_field_name))
                model_class = getattr(models, model_class_name)
                self.assertTrue(getattr(model_class, model_class_field_name, None))
                sys.stdout.write('   -> OK \n')
            sys.stdout.write(' => OK \n')

    def test_model_class_fields_types(self):
        import sys
        for model_class_name in self.models_for_test:
            sys.stdout.write('test model class name "%s" \n' % model_class_name)
            for model_class_field_name in self.models_for_test[model_class_name]:
                expect_field = self.models_for_test[model_class_name][model_class_field_name]
                sys.stdout.write('  test model class "%s" field "%s" expected type "%s" as "%s" \n' % (
                    model_class_name,
                    model_class_field_name,
                    expect_field[0],
                    expect_field[1],
                ))
                # (expect_field_type, cl) =

                # model_class = getattr(models, model_class_name)
                # model_class_field = getattr(model_class, model_class_field_name)
                # self.assertTrue(issubclass(model_class_field, expect_field_type))
                sys.stdout.write('   -> OK \n')
            sys.stdout.write(' => OK \n')
