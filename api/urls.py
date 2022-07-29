from django.urls import path, include
from rest_framework import routers
from api.views import RegisterView, MyTokenObtainPairView
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)


router = routers.DefaultRouter()
router.register(r'foods', views.FoodViewSet)
router.register(r'foodregister', views.FoodRegisterViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/register/', RegisterView.as_view(), name='user_register'),
    path('user/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
