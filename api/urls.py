from django.urls import path
from .views import DailyFoodListCreateView, FoodListView, \
    CustomLogoutView, ComidaRetrieveUpdateDestroyView, ComidaCreateView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('foodregister/', DailyFoodListCreateView.as_view(), name='foodregister'),
    path('foods/', FoodListView.as_view(), name='category-list'),
    path('food/', ComidaCreateView.as_view(), name='comida-create'),
    path('foods/<int:pk>/', ComidaRetrieveUpdateDestroyView.as_view(),
         name='tipos-comida-retrieve-update-destroy'),
    # Rutas de autenticación
    path('login/', obtain_auth_token, name='api-token-auth'),
    path('logout/', CustomLogoutView.as_view(), name='api-logout'),

]
