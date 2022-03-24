from django.urls import path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # path('<str:tipo>', views.homefilter, name='homefilter'),
    path('almuerzos/', views.almuerzo, name='home'),
    path('desayuno/', views.almuerzo, name='home'),
    path('comida/', views.almuerzo, name='home'),
]
