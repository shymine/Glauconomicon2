from django.db import models
# from glauc.fields import SeparatedValuesField
import json

class Scenario(models.Model):
    title = models.CharField(max_length=64, blank=False, default='')


class Stage(models.Model):
    title = models.CharField(max_length=64, blank=False, default='')
    description = models.TextField()
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE, related_name='stages',
                                 null=True)

class CharacterSheet(models.Model):
    name = models.CharField(max_length=64, blank=False, default='')

class SheetSection(models.Model):
    name = models.CharField(max_length=64, blank=False, default='')
    sheet = models.ForeignKey(CharacterSheet, on_delete=models.CASCADE, related_name='sections', null=True)

class SheetField(models.Model):
    name = models.CharField(max_length=64, blank=False, default='')
    section = models.ForeignKey(SheetSection, on_delete=models.CASCADE, related_name='fields', null=True)

class SheetList(models.Model):
    name = models.CharField(max_length=64, blank=False, default='')
    section = models.ForeignKey(SheetSection, on_delete=models.CASCADE, related_name='lists', null=True)

class SheetTable(models.Model):
    # headers = SeparatedValuesField()
    headers = models.CharField(max_length=256, blank=False, default='')
    section = models.ForeignKey(SheetSection, on_delete=models.CASCADE, related_name='tables', null=True)

