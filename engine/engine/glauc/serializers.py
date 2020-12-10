from django.contrib.auth.models import User, Group
from rest_framework import serializers
from engine.glauc.models import Stage, Scenario


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
        fields = ['id', 'title', 'order', 'description']

class ScenarioSerializer(serializers.HyperlinkedModelSerializer):
    stages = serializers.StringRelatedField(many=True)
    class Meta:
        model = Scenario
        fields = ['id', 'title', 'stages']

class StageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stage
        fields = ['id', 'title', 'description', 'order']