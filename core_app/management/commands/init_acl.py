from django.core.management.base import BaseCommand
from . import (
    init_users,
    init_users_groups,
    init_groups_permissions
)


# manage.py create_users
class Command(BaseCommand):
    help = 'Init ACL.'

    def handle(self, *args, **options):

        self.stdout.write(self.style.SUCCESS('Let\'s create ACL.'))
        self.stdout.write(self.style.SUCCESS(''))

        users = init_users.Command()
        users.handle(*args, **options)

        self.stdout.write(self.style.SUCCESS(''))

        users_groups = init_users_groups.Command()
        users_groups.handle(*args, **options)

        self.stdout.write(self.style.SUCCESS(''))

        groups_permissions = init_groups_permissions.Command()
        groups_permissions.handle(*args, **options)

        self.stdout.write(self.style.SUCCESS(''))
        self.stdout.write(self.style.SUCCESS(' => ACL was init.'))
