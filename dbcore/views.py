import json
from django.shortcuts import render
from .models import FoodRegister, Family, Food
from django.http import HttpResponse


def home(request):
    if request.method == 'GET':
        # Familia
        familia = Family.objects.get(id=1)
        #Registro de comidas!
        comidas = FoodRegister.objects.all().order_by('-created_at')

        context = {
            'familia': familia,
            'comidas': comidas,
        }
        return render(request, 'home.html', context)


def homefilter(request, tipo):
    if request.method == 'GET':
        # Familia
        familia = Family.objects.get(id=1)
        #Registro de comidas!
        comidas = FoodRegister.objects.filter(schedule=tipo).order_by('-created_at')

        context = {
            'familia': familia,
            'comidas': comidas,
        }
        return render(request, 'home.html', context)


def almuerzo(request):
    if request.method == 'GET':
        # Familia
        familia = Family.objects.get(id=1)
        #Registro de comidas!
        comidas = FoodRegister.objects.filter(schedule='AL').order_by('-created_at')

        context = {
            'comidas': comidas,
        }
        return render(request, 'almuerzos.html', context)

def desayuno(request):
    if request.method == 'GET':
        # Familia
        familia = Family.objects.get(id=1)
        #Registro de comidas!
        comidas = FoodRegister.objects.filter(schedule='DE').order_by('-created_at')

        context = {
            'comidas': comidas,
        }
        return render(request, 'almuerzos.html', context)


def comida(request):
    if request.method == 'GET':
        # Familia
        familia = Family.objects.get(id=1)
        #Registro de comidas!
        comidas = FoodRegister.objects.filter(schedule='CO').order_by('-created_at')

        context = {
            'comidas': comidas,
        }
        return render(request, 'almuerzos.html', context)


def demo(request):
    if request.method == 'GET':
        comidas = Food.objects.all().order_by('-name')
        print(comidas)
        context = {
            'comidas': ['a','b'],
        }
        return HttpResponse(json.dumps(context), content_type = "application/json")