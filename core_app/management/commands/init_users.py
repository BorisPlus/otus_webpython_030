from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

USERS_COLLECTIONS = [
    {
        'users': [
            {'username': 'superuser', 'password': '123456'},
        ],
        'common_attributes': {'is_superuser': True},
    },
    {
        'users': [
            {'username': 'John', 'password': '111111', 'is_staff': True, 'last_name': 'Doe', 'first_name': 'John'},

            {'username': 'Alice', 'last_name': 'Smith', 'first_name': 'A.'},
            {'username': 'Bob', 'last_name': 'Zero', 'first_name': 'B.'},
            {'username': 'Charlie', 'last_name': 'Ivanov', 'first_name': 'C.'},
            {'username': 'Dave', 'last_name': 'Compact', 'first_name': 'D.'},
            {'username': 'Eve', 'last_name': 'Bru', 'first_name': 'E.'},
            {'username': 'Frank', 'last_name': 'Sinatra', 'first_name': 'F.'},
        ],
        'common_attributes': {'is_superuser': False, 'is_staff': False, 'password': '000000'},
    }]


class ExtendUser(User):
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        self.set_password(self.password)
        super(ExtendUser, self).save(*args, **kwargs)


# manage.py create_users
class Command(BaseCommand):
    help = 'Init users'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

        try:
            self.stdout.write(self.style.SUCCESS('Let\'s create users collections:'))
            for i_collection, users_collection in enumerate(USERS_COLLECTIONS):
                self.stdout.write(self.style.SUCCESS(
                    ' -> let\'s create users collection №%s:' % (i_collection + 1)))
                common_attributes = users_collection.get('common_attributes')
                for user in users_collection['users']:
                    attributes = dict()
                    attributes.update(common_attributes)
                    attributes.update(user)

                    # User.objects.get_or_create
                    user_obj = ExtendUser.objects.filter(
                        username=attributes.get('username')
                    ).first()

                    if user_obj is None:
                        save_or_update = 'saved'
                        user_obj = ExtendUser(
                            **attributes
                        )
                        user_obj.save()
                    else:
                        save_or_update = 'updated'
                        user_obj.__dict__.update(attributes)
                        user_obj.save()
                        # ExtendUser.objects.filter(pk=user_obj.pk).update(**attributes)

                    self.stdout.write(self.style.SUCCESS(
                        '   -> user "%s" was %s;' % (user.get('username'), save_or_update)))
                self.stdout.write(self.style.SUCCESS(
                    '   -> All users of collection №%s were created.' % (i_collection + 1)))
            self.stdout.write(self.style.SUCCESS(
                ' => All users of all collections were created.'))
        except:
            raise
