from rest_framework import serializers
from glauc.models import Stage, Scenario

class StageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stage
        fields = ['id', 'title', 'description', 'scenario']

class ScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = ['id', 'title', 'stages']

