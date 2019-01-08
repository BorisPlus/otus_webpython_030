from django.core.management.base import BaseCommand
from django.contrib.auth.models import (
    Group, User
)

USERS_GROUPS = {
    'teachers': ['John'],
    'pupils': ['Alice', 'Bob', 'Charlie'],
}


class Command(BaseCommand):
    help = 'Init users groups'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):

        try:
            self.stdout.write(self.style.SUCCESS('Let\'s create users groups:'))
            for group_name in USERS_GROUPS:
                group, was_group_create = Group.objects.get_or_create(name=group_name)
                self.stdout.write(self.style.SUCCESS(' -> group "%s" was created:' % group_name))
                for username in USERS_GROUPS.get(group_name):
                    # User.objects.get_or_create
                    user = User.objects.filter(
                        username=username
                    ).first()
                    if user is None:
                        self.stdout.write(self.style.ERROR(
                            '   -> user with username "%s" does not exists;' % username))
                    group.user_set.add(user)
                    self.stdout.write(self.style.SUCCESS(
                        '   -> user with username "%s" was add to group "%s";' % (username, group_name)))
                group.save()
                self.stdout.write(self.style.SUCCESS('   -> Group "%s" was saved.' % group_name))
            self.stdout.write(self.style.SUCCESS(' => All groups were init.'))
        except:
            raise
