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
