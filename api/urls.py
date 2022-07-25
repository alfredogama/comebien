from django.urls import path, include
from rest_framework import routers
from api.views import FoodViewSet
from . import views


router = routers.DefaultRouter()
router.register(r'foods', views.FoodViewSet)
router.register(r'foodregister', views.FoodRegisterViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
