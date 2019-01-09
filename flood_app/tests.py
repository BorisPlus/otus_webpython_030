from django.test import TestCase

# Create your tests here.
from . import models


def do_nothing():
    pass


def get_new_value():
    import datetime
    import pytz
    return datetime.datetime.now(pytz.timezone('UTC'))


class LowLevelTDDTestCase(TestCase):
    """
    Low level TDD.
    - Check model exists
    - Check model fields exists
    - Check model fields have need type
    - Check model fields have need relation
    """
    HAS_NO_RELATION = None

    def setUp(self):
        from django.db import models as django_models
        self.models_for_test = {
            'User': {
                'username': (django_models.CharField, self.__class__.HAS_NO_RELATION),
            },
            'Chat': {
                'name': (django_models.CharField, self.__class__.HAS_NO_RELATION),
                'created_at': (django_models.DateTimeField, self.__class__.HAS_NO_RELATION),
                'owner': (django_models.ForeignKey, models.User)
            },
            'ChatMessage': {
                'text': (django_models.CharField, self.__class__.HAS_NO_RELATION),
                'created_at': (django_models.DateTimeField, self.__class__.HAS_NO_RELATION),
                'owner': (django_models.ForeignKey, models.User),
                'chat': (django_models.ForeignKey, models.Chat)
            },
            'Access': {
                'rank_order': (django_models.PositiveIntegerField, self.__class__.HAS_NO_RELATION),
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
                sys.stdout.write(
                    '  test model class "%s" field name "%s" \n' % (model_class_name, model_class_field_name))
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
                sys.stdout.write('  test model class "%s" field "%s" expected type "%s"  \n' % (
                    model_class_name,
                    model_class_field_name,
                    expect_field[0],
                    # expect_field[1],
                ))
                model_class = getattr(models, model_class_name)

                # model_class_field = getattr(model_class, model_class_field_name)
                # sys.stdout.write('\t\t %s %s\n' % (model_class_field_name, model_class_field.__class__))
                # sys.stdout.write('\t\t %s %s\n' % (
                #     model_class_field_name, model_class._meta.get_field(model_class_field_name).get_internal_type()))

                model_class_field_class = model_class._meta.get_field(model_class_field_name).__class__

                model_class_field_expect_class = expect_field[0]

                # sys.stdout.write('\t\t %s == %s\n' % (internal_type, expect_field[0]))
                # sys.stdout.write('\t\t %s\n' % (internal_type == expect_field[0]))
                #
                # sys.stdout.write('\t\t %s == %s\n' % (internal_type, expect_field[0]))
                # sys.stdout.write('\t\t %s\n' % (internal_type == expect_field[0]))

                self.assertTrue(model_class_field_class == model_class_field_expect_class)

                sys.stdout.write('   -> OK \n')
            sys.stdout.write(' => OK \n')

    def test_model_class_fields_related_models(self):
        import sys
        for model_class_name in self.models_for_test:
            sys.stdout.write('test model class name "%s" \n' % model_class_name)
            for model_class_field_name in self.models_for_test[model_class_name]:
                expect_field = self.models_for_test[model_class_name][model_class_field_name]
                if expect_field[1] == self.__class__.HAS_NO_RELATION:
                    continue
                sys.stdout.write('  test model class "%s" field "%s" expected relation to "%s" \n' % (
                    model_class_name,
                    model_class_field_name,
                    expect_field[1],
                ))

                model_class_field_expect_related_model = expect_field[1]

                model_class = getattr(models, model_class_name)
                model_class_field_related_model = model_class._meta.get_field(model_class_field_name).related_model

                # sys.stdout.write('\t\t %s \n' % (model_class_field_related_model))
                # sys.stdout.write('\t\t %s \n' % (model_class_field_expect_related_model))

                self.assertTrue(model_class_field_related_model == model_class_field_expect_related_model)

                sys.stdout.write('   -> OK \n')
            sys.stdout.write(' => OK \n')


class UserTestCase(TestCase):
    def test_user_exists(self):
        """User can be creating/exists"""
        test_user, test_user_was_created = models.User.objects.get_or_create(username="test_user")
        self.assertIsNotNone(test_user)

    def test_was_new_created_recently(self):
        test_user, test_user_was_created = models.User.objects.get_or_create(username=get_new_value())
        self.assertTrue(test_user_was_created)


class ChatTestCase(TestCase):
    def test_chat_exists(self):
        """Chat can be creating/exists"""
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


class AccessTestCase(TestCase):
    def test_uniquest(self):
        """
        django.db.utils.IntegrityError: UNIQUE constraint failed: flood_app_access.user_id, flood_app_access.chat_id
        """
        test_user, test_user_was_created = models.User.objects.get_or_create(username="test_user")
        test_chat, test_chat_was_created = models.Chat.objects.get_or_create(owner=test_user, name="test_chat")
        other_user, other_user_was_created = models.User.objects.get_or_create(username="other_user")

        # Force create or get
        test_access, test_access_was_created = models.Access.objects.get_or_create(user=other_user, chat=test_chat)

        new_access = models.Access(user=other_user, chat=test_chat)
        # new_access.save()
        from django.db.utils import IntegrityError

        self.assertRaises(IntegrityError, new_access.save)

