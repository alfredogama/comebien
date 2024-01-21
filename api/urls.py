from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('foodregister/', DailyFoodListCreateView.as_view(), name='foodregister'),
    path('foods/', FoodListView.as_view(), name='category-list'),
    path('foodlist/', FoodFullListView.as_view(), name='foodlist'),
    path('foodliststats/', ComidaOcurrences.as_view(), name='foodliststats'),
    path('foodlist/count/', FoodCount.as_view(), name='meal-count'),
    path('filterbyname/<int:comida_id>/', FiltroPorNombreComida.as_view(), name='filtropornombredecomida'),

    path('listado/', FoodRegisterListView.as_view(), name='seguimiento-comida-list'),
    path('food/', ComidaCreateView.as_view(), name='comida-create'),
    path('foodregister/<int:pk>/editar', FoodRegisterUpdateDestroyView.as_view(),
         name='editar-registro'),
    # Herramientas
    path('set-food-image/<int:registro_comida_id>/<int:comida_id>/', SetFoodImage.as_view(),
         name='comida-create'),

    # Rutas de autenticación
    path('login/', obtain_auth_token, name='api-token-auth'),
    path('logout/', CustomLogoutView.as_view(), name='api-logout'),

]
