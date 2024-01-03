from rest_framework import generics, permissions
from dbcore.models import FoodRegister, Food
from .serializers import DailyFoodSerializer, FoodSerializer, Family
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.views import obtain_auth_token


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

class FoodListView(generics.ListAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer


class CustomLogoutView(APIView):
    def post(self, request):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)


obtain_auth_token = obtain_auth_token  # Just to silence linting warning
