from django.db import models

class Scenario(models.Model):
    title = models.CharField(max_length=64, blank=False, default='')


class Stage(models.Model):
    title = models.CharField(max_length=64, blank=False, default='')
    description = models.TextField()
    scenario = models.ForeignKey(Scenario, on_delete=models.CASCADE, related_name='stages',
                                 null=True)