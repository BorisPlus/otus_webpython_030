# Create your tests here.
from . import models
from django.db import models as django_models
import pytest

HAS_NO_RELATION = None


class LowLevelTddFixture:
    models_definitions = {
        'User': {
            'username': (django_models.CharField, HAS_NO_RELATION),
        },
        'Chat': {
            'name': (django_models.CharField, HAS_NO_RELATION),
            'created_at': (django_models.DateTimeField, HAS_NO_RELATION),
            'owner': (django_models.ForeignKey, models.User)
        },
        'ChatMessage': {
            'text': (django_models.CharField, HAS_NO_RELATION),
            'created_at': (django_models.DateTimeField, HAS_NO_RELATION),
            'owner': (django_models.ForeignKey, models.User),
            'chat': (django_models.ForeignKey, models.Chat)
        },
        'Access': {
            'rank_order': (django_models.PositiveIntegerField, HAS_NO_RELATION),
            'user': (django_models.ForeignKey, models.User),
            'chat': (django_models.ForeignKey, models.Chat)
        },
    }

    @staticmethod
    def build():
        """
        build fixture with its semantics identity
        :return:
        """
        fixtures = []
        ids = []
        for model_name in __class__.models_definitions:
            field_definition = __class__.models_definitions[model_name]
            for expected_field_name in field_definition:
                fixture = (model_name, expected_field_name, field_definition[expected_field_name][0],
                           field_definition[expected_field_name][1])
                fixtures.append(fixture)
                ids.append(
                    '%s.%s must be %s with relation to %s' % (
                        model_name, expected_field_name, field_definition[expected_field_name][0],
                        field_definition[expected_field_name][1]
                    )
                )

        return {'argvalues': fixtures, 'ids': ids}


@pytest.mark.parametrize("model_class_name,expected_field_name,expected_field_class,expected_field_relation",
                         **LowLevelTddFixture.build())
def test_model_class_exists(model_class_name,
                            expected_field_name, expected_field_class, expected_field_relation):
    assert (model_class_name in dir(models) and
            callable(getattr(models, model_class_name)) and
            issubclass(getattr(models, model_class_name), django_models.Model))


@pytest.mark.parametrize("model_class_name,expected_field_name,expected_field_class,expected_field_relation",
                         **LowLevelTddFixture.build())
def test_model_class_fields_exists(model_class_name, expected_field_name,
                                   expected_field_class, expected_field_relation):
    model_class = getattr(models, model_class_name)
    assert getattr(model_class, expected_field_name, None) is not None


@pytest.mark.parametrize("model_class_name,expected_field_name,expected_field_class,expected_field_relation",
                         **LowLevelTddFixture.build())
def test_model_class_fields_types(model_class_name, expected_field_name, expected_field_class,
                                  expected_field_relation):
    model_class = getattr(models, model_class_name)
    field_class = model_class._meta.get_field(expected_field_name).__class__
    assert field_class == expected_field_class


@pytest.mark.parametrize("model_class_name,expected_field_name,expected_field_class,expected_field_relation",
                         **LowLevelTddFixture.build())
def test_model_class_fields_related_models(model_class_name, expected_field_name, expected_field_class,
                                           expected_field_relation):
    if expected_field_relation == HAS_NO_RELATION:
        return
    model_class = getattr(models, model_class_name)
    field_relation = model_class._meta.get_field(expected_field_name).related_model
    assert field_relation == expected_field_relation
