from rest_framework import generics, permissions
from dbcore.models import FoodRegister, Food, FoodType
from .serializers import DailyFoodSerializer, FoodSerializer, \
    Family, FoodRegisterSerializer, FoodFullSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.views import obtain_auth_token
from .pagination import FoodPagination  # Importa el paginador personalizado
from django.db.models import Count


class DailyFoodListCreateView(generics.CreateAPIView):
    queryset = FoodRegister.objects.all()
    serializer_class = DailyFoodSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        #agregar el usuario
        user = self.request.user
        schedule = "AL"
        family = Family.objects.get(id=1)
        serializer.save(owner=user, schedule=schedule, family=family)


class FoodRegisterListView(generics.ListAPIView):
    queryset = FoodRegister.objects.all().order_by('-created_at')
    serializer_class = FoodRegisterSerializer
    pagination_class = FoodPagination  # Usa el paginador personalizado


class FoodRegisterUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FoodRegister.objects.all()
    serializer_class = FoodRegisterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        # Recuperar la instancia de Comida a actualizar
        instance = self.get_object()

        # Generar un nuevo nombre aleatorio
        user = self.request.user
        schedule = "AL"
        family = Family.objects.get(id=1)

        # Actualizar el nombre de la Comida
        instance.owner = user
        instance.schedule = schedule
        instance.family = family

        # Resto de la lógica de actualización, similar al comportamiento predeterminado de DRF
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class FoodListView(generics.ListAPIView):
    queryset = Food.objects.all().order_by('name')
    serializer_class = FoodSerializer


class FoodFullListView(generics.ListAPIView):
    queryset = Food.objects.all().order_by('name')
    serializer_class = FoodFullSerializer


class FoodCount(generics.RetrieveAPIView):
    serializer_class = FoodFullSerializer

    def get(self, request, *args, **kwargs):
        count = Food.objects.count()
        return Response({'count': count}, status=status.HTTP_200_OK)


class ComidaOcurrences(generics.ListAPIView):
    serializer_class = FoodFullSerializer

    def get_queryset(self):
        # Utilizamos annotate para agregar un nuevo campo 'ocurrencias' que representa el conteo de comidas en RegistroComida
        comidas = Food.objects.annotate(ocurrencias=Count('food_1'))

        print(str(comidas.query))

        return comidas


class FiltroPorNombreComida(APIView):
    #filter por usuario y por id detipo de comida.
    def get(self, request, *args, **kwargs):
        comida_id = self.kwargs.get('comida_id', None)

        # Utiliza filter en lugar de get para obtener múltiples resultados
        comidas = FoodRegister.objects.filter(food_1_id=comida_id).order_by('-created_at')

        if comidas.exists():
            serializer = FoodRegisterSerializer(comidas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Comida no encontrada"}, status=status.HTTP_404_NOT_FOUND)

class CustomLogoutView(APIView):
    def post(self, request):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)


class ComidaCreateView(generics.CreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

    def perform_create(self, serializer):
        type_food = FoodType.objects.get(id=1)
        serializer.save(type=type_food)


class ComidaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


obtain_auth_token = obtain_auth_token  # Just to silence linting warning
