from django.urls import path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # path('<str:tipo>', views.homefilter, name='homefilter'),
    path('almuerzos/', views.almuerzo, name='home'),
    path('desayuno/', views.desayuno, name='home'),
    path('comida/', views.comida, name='home'),
    path('client/', views.demo, name='home'),
    path('registro/', views.registro, name='home'),
    path('ingresar/', views.ingresar, name='ingresar'),
    path('comida/', views.ingresar, name='comida'),
    path('listado/', views.listado, name='listado'),
    path('editar/', views.editar, name='editar'),
    path('listacomidas/', views.listacomidas, name='listacomidas'),
    path('listacomidaspornombre/', views.listacomidaspornombre, name='listacomidaspornombre'),
    path('demo/', views.demo, name='comida'),
]
