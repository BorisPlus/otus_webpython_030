from django.core.management.base import BaseCommand
from django.contrib.auth.models import (
    Group,
    Permission
)

GROUPS_PERMISSIONS = {
    'teachers': {
        'add': {
            'Chat',
            'ChatMessage',
            'Access',
        },
        'change': {
            'Chat',
            'ChatMessage',
            'Access',
        },
        'delete': {
            'Chat',
            'ChatMessage',
            'Access',
        },
    },
    'pupils': {
        'add': {
            'ChatMessage',
        },
        'change': {
            'Chat',
            'ChatMessage',
            'Access',
        },
    }
}


# manage.py create_users
class Command(BaseCommand):
    help = 'Init permissions of groups'

    def handle(self, *args, **options):

        """
        FOR TEST CODENAMES:

        for i in Permission.objects.all():
            self.stdout.write(self.style.SUCCESS(i.name))
            self.stdout.write(self.style.SUCCESS(i.codename))
        """

        self.stdout.write(self.style.SUCCESS('Let\'s create groups permissions:'))
        for group_name in GROUPS_PERMISSIONS:
            group = Group.objects.filter(name=group_name).first()
            if group is None:
                self.stdout.write(self.style.ERROR(
                    '   -> group "%s" does not exists;' % group_name))
            else:
                self.stdout.write(self.style.SUCCESS(' -> set permissions to "%s" group:' % group_name))
                for permission_action in GROUPS_PERMISSIONS[group_name]:
                    for permission_model in GROUPS_PERMISSIONS[group_name][permission_action]:
                        permission_name = 'Can {} {}'.format(permission_action, permission_model)
                        permission_codename = '{}_{}'.format(permission_action.lower(), permission_model.lower())
                        self.stdout.write(self.style.SUCCESS(
                            ('   -> set permission "{}" '
                             'with codename "{}";').format(permission_name, permission_codename)))
                        try:
                            permission_obj = Permission.objects.get(codename=permission_codename)
                            group.permissions.add(permission_obj)
                        except Permission.DoesNotExist:
                            self.stdout.write(self.style.ERROR(
                                ('   -> (!!!) permission "{}" '
                                 'with codename "{}" does not found;').format(permission_name, permission_codename)))
                            continue

            self.stdout.write(self.style.SUCCESS('   -> All permissions were set to group "%s".' % group_name))
        self.stdout.write(self.style.SUCCESS(' => All permissions of all groups were created.'))
