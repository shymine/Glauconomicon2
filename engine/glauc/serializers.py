from rest_framework import serializers
from glauc.models import Stage, Scenario, CharacterSheet, SheetSection, SheetField, SheetList, SheetTable


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ['id', 'title', 'description', 'scenario']

class ScenarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scenario
        fields = ['id', 'title', 'stages']

class SheetFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetField
        fields = ['id', 'name']

class SheetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetList
        fields = ['id', 'name']

class SheetTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = SheetTable
        fields = ['id', 'headers']

class CharacterSheetSerializer(serializers.ModelSerializer):
    fields = SheetFieldSerializer(many=True)

    class Meta:
        model = CharacterSheet
        fields = ['id', 'name', 'sections', 'fields']

class SheetSectionSerializer(serializers.ModelSerializer):
    fields = SheetFieldSerializer(many=True)
    lists = SheetListSerializer(many=True)
    tables = SheetTableSerializer(many=True)

    class Meta:
        model = SheetSection
        fields = ['id', 'name', 'fields', 'lists', 'tables']

    def create(self, validated_data):
        fields_data = validated_data.pop('fields')
        lists_data = validated_data.pop('lists')
        tables_data = validated_data.pop('tables')
        sheetSection = SheetSection.objects.create(**validated_data)
        for field in fields_data:
            SheetField.objects.create(section=sheetSection, **field)
        for list in lists_data:
            SheetList.objects.create(section=sheetSection, **list)
        for table in tables_data:
            SheetTable.objects.create(section=sheetSection, **table)
        return sheetSection

    def update(self, instance, validated_data):
        fields_data = validated_data.pop('fields')
        lists_data = validated_data.pop('lists')
        tables_data = validated_data.pop('tables')
        fields = instance.fields
        lists = instance.lists
        tables = instance.tables

        instance.name = validated_data.get('name', instance.name)
        instance.save()

        for field in fields_data:
            if not field.name in [field_d.name for field_d in fields]:
                SheetField.objects.create(section=instance)
        for l in lists_data:
            if not l.name in [list_d.name for list_d in lists]:
                SheetList.objects.create(section=instance)
        tables.clear()
        for table in tables_data:
            SheetTable.objects.create(section=instance, **table)
        return instance
