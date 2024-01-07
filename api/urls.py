from django.urls import path
from .views import DailyFoodListCreateView, FoodListView, \
    CustomLogoutView, ComidaRetrieveUpdateDestroyView, \
    ComidaCreateView, FoodRegisterListView, FoodRegisterUpdateDestroyView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('foodregister/', DailyFoodListCreateView.as_view(), name='foodregister'),
    path('foods/', FoodListView.as_view(), name='category-list'),
    path('listado/', FoodRegisterListView.as_view(), name='seguimiento-comida-list'),
    path('food/', ComidaCreateView.as_view(), name='comida-create'),
    path('foodregister/<int:pk>/editar', FoodRegisterUpdateDestroyView.as_view(),
         name='editar-registro'),
    # Rutas de autenticación
    path('login/', obtain_auth_token, name='api-token-auth'),
    path('logout/', CustomLogoutView.as_view(), name='api-logout'),

]
