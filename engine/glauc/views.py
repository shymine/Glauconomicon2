from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from glauc.models import Scenario, Stage, CharacterSheet, SheetSection
from glauc.serializers import ScenarioSerializer, StageSerializer, CharacterSheetSerializer, SheetSectionSerializer


@api_view(['GET', 'POST'])
def scenario_list(request):
    if request.method == 'GET':
        scenarii = Scenario.objects.all()
        serializer = ScenarioSerializer(scenarii, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ScenarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def scenario_detail(request, pk):
    try:
        scenario = Scenario.objects.get(pk=pk)
    except Scenario.DoesNotExist:
        return JsonResponse({'message': 'The Scenario {} does not exist'.format(pk)},
                            status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ScenarioSerializer(scenario)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ScenarioSerializer(scenario, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        scenario.delete()
        return JsonResponse({'message': 'Scenario was successfully deleted'},
                            status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def stage_list(request, sc_pk):
    try:
        scenario = Scenario.objects.get(pk=sc_pk)
    except:
        return JsonResponse({'message': 'The Scenario {} does not exist'.format(sc_pk)},
                            status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        stages = Stage.objects.all()
        stages = stages.filter(scenario_id=sc_pk)
        serializer = StageSerializer(stages, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data['scenario'] = int(sc_pk)
        print("data: {}".format(data))
        serializer = StageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def stage_detail(request, sc_pk, pk):
    try:
        scenario = Scenario.objects.get(pk=sc_pk)
    except:
        return JsonResponse({'message': 'The Scenario {} does not exist'.format(sc_pk)},
                            status=status.HTTP_404_NOT_FOUND)
    try:
        stage = Stage.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The Stage {} does not exist'.format(pk)},
                            status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StageSerializer(stage)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = StageSerializer(stage, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        stage.delete()
        return JsonResponse({'message': 'Stage was successfully deleted'},
                            status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def characterSheet_list(request):
    if request.method == 'GET':
        characterSheet = CharacterSheet.objects.all()
        serializer = CharacterSheetSerializer(characterSheet, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CharacterSheetSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def characterSheet_detail(request, pk):
    try:
        characterSheet = CharacterSheet.objects.get(pk=pk)
    except CharacterSheet.DoesNotExist:
        return JsonResponse({'message': 'The CharacterSheet {} does not exist'.format(pk)},
                            status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CharacterSheetSerializer(characterSheet)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ScenarioSerializer(characterSheet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        characterSheet.delete()
        return JsonResponse({'message': 'CharacterSheet was successfully deleted'},
                            status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def sheetSection_list(request, cs_pk):
    try:
        characterSheet = CharacterSheet.objects.get(pk=cs_pk)
    except:
        return JsonResponse({'message': 'The CharacterSheet {} does not exist'.format(cs_pk)},
                            status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        sheetSection = SheetSection.objects.all()
        stages = sheetSection.filter(sheet_id=cs_pk)
        serializer = SheetSectionSerializer(stages, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data['sheet'] = int(cs_pk)
        print("data: {}".format(data))
        serializer = SheetSectionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def sheetSection_detail(request, cs_pk, pk):
    try:
        characterSheet = Scenario.objects.get(pk=cs_pk)
    except:
        return JsonResponse({'message': 'The CharacterSheet {} does not exist'.format(cs_pk)},
                            status=status.HTTP_404_NOT_FOUND)
    try:
        sheetSection = SheetSection.objects.get(pk=pk)
    except:
        return JsonResponse({'message': 'The SheetSection {} does not exist'.format(pk)},
                            status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SheetSectionSerializer(sheetSection)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SheetSectionSerializer(sheetSection, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        sheetSection.delete()
        return JsonResponse({'message': 'SheetSection was successfully deleted'},
                            status=status.HTTP_204_NO_CONTENT)