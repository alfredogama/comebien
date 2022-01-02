from django.shortcuts import render
from .models import FoodRegister, Family


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
