from django.contrib.auth.models import User, Group
from rest_framework import serializers
from engine.glauc.models import Stage, Scenario


class ObjectRelatedField(serializers.RelatedField):

    def to_representation(self, value):
        """for foreign_key related field"""
        if isinstance(value, Stage):
            return value.id

        raise Exception("Unexpected type of related field: {}" % value.type())

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class StageSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Stage
        fields = ['id', 'title', 'description', 'order']


class ScenarioSerializer(serializers.HyperlinkedModelSerializer):
    # stages = StageSerializer(many=True) # use nested serializer
    stages = serializers.StringRelatedField(many=True) # use the __str__ function

    class Meta:
        model = Scenario
        fields = ['id', 'title', 'stages']