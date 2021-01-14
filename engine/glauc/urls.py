from django.conf.urls import url
from glauc import views


urlpatterns = [
    url(r'^api/scenario$', views.scenario_list),
    url(r'^api/scenario/(?P<pk>[0-9]+)$', views.scenario_detail),
    url(r'^api/stage/(?P<sc_pk>[0-9]+)$', views.stage_list),
    url(r'^api/stage/(?P<sc_pk>[0-9]+)/(?P<pk>[0-9]+)$', views.stage_detail)
]