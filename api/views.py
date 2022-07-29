from django.shortcuts import render, get_object_or_404, redirect
import json
from django.http import HttpResponseRedirect, JsonResponse
from django.views.generic import View
from dbcore.models import *
from django.contrib.auth.models import User
from api.serializers import FoodSerializer, FoodRegiterSerializer, RegisterSerializer
from rest_framework import generics, serializers, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class FoodViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    #permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [IsAuthenticated]
    #authentication_classes = []  # disables authentication
    # permission_classes = []  # disables permission
    queryset = Food.objects.all().order_by('-name')
    serializer_class = FoodSerializer


class FoodRegisterViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Food Register """
    permission_classes = [IsAuthenticated]
    queryset = FoodRegister.objects.all().order_by('-created_at')
    serializer_class = FoodRegiterSerializer
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom information to the payload
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
