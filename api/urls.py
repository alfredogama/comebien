from django.urls import path
from .views import DailyFoodListCreateView, FoodListView, CustomLogoutView
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('foodregister/', DailyFoodListCreateView.as_view(), name='foodregister'),
    path('foods/', FoodListView.as_view(), name='category-list'),
    # Rutas de autenticación
    path('login/', obtain_auth_token, name='api-token-auth'),
    path('logout/', CustomLogoutView.as_view(), name='api-logout'),
]
