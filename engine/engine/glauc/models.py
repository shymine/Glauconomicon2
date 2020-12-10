from django.db import models

# Create your models here.

class Scenario(models.Model):
    title = models.CharField(max_length=180, blank=True, default='scenario')
    id = models.IntegerField()

    class Meta:
        ordering = ['id']

class Stage(models.Model):
    title = models.CharField(max_length=180, blank=True, default='stage')
    description = models.TextField()
    order = models.IntegerField()
    id = models.IntegerField()
    scenario_id = models.ForeignKey(Scenario, on_delete=models.CASCADE, related_name='stages')

    class Meta:
        ordering = ['order']
