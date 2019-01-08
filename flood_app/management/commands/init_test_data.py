from django.core.management.base import BaseCommand
from ... import models

TEST_DATA = [
    {'chat_owner': 'John', 'chat_name': 'A & B', 'users': {'Alice': 1, 'Bob': 1}},
    {'chat_owner': 'Charlie', 'chat_name': 'A & C', 'users': {'Alice': 2, 'Charlie': 1}},
    {'chat_owner': 'Charlie', 'chat_name': 'C & B', 'users': {'Bob': 2, 'Charlie': 2}, },
    {'chat_owner': 'Charlie', 'chat_name': 'C & s', 'users': {'superuser': 2, 'Charlie': 2}, },
    {'chat_owner': 'John', 'chat_name': 'A & B & C & J', 'users': {'Alice': 3, 'Bob': 3, 'Charlie': 3}},
    {'chat_owner': 'John', 'chat_name': 'It is empty :(', 'users': {}},
]


# manage.py init_test_data
class Command(BaseCommand):
    help = 'Init test data'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

        try:
            self.stdout.write(self.style.SUCCESS('Let\'s init test data:'))
            for i_data, data in enumerate(TEST_DATA):
                self.stdout.write(self.style.SUCCESS(' -> chat "%s" with owner "%s".' % (
                    data.get('chat_name'), data.get('chat_owner'))))
                chat_owner, chat_owner_created = models.User.objects.get_or_create(username=data.get('chat_owner'))
                chat, chat_created = models.Chat.objects.get_or_create(name=data.get('chat_name'), owner=chat_owner)
                self.stdout.write(self.style.SUCCESS(' -> chat "%s" with owner "%s".' % (chat, chat_owner)))
                users_names_with_rank = data.get('users', [])
                for i_username, username in enumerate(users_names_with_rank):
                    self.stdout.write(
                        self.style.SUCCESS('   -> add for user "%s" access to chat "%s"  with rank "%s".' % (
                            username, chat, users_names_with_rank.get(username))))
                    user, user_created = models.User.objects.get_or_create(username=username)
                    access, access_created = models.Access.objects.get_or_create(user=user, chat=chat)
                    access.rank_order = users_names_with_rank.get(username)
                    access.save()
                self.stdout.write(self.style.SUCCESS('   -> All users were add.'))
            self.stdout.write(self.style.SUCCESS(
                ' => All test data were created.'))
        except:
            raise
