from django.shortcuts import render, get_object_or_404, redirect
import json
from django.http import HttpResponseRedirect, JsonResponse
from django.views.generic import View
from dbcore.models import *
from django.contrib.auth.models import User
from api.serializers import FoodSerializer, FoodRegiterSerializer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.parsers import MultiPartParser, FormParser


class FoodViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    authentication_classes = []  # disables authentication
    permission_classes = []  # disables permission
    queryset = Food.objects.all().order_by('-name')
    serializer_class = FoodSerializer
    # permission_classes = [permissions.IsAuthenticated]


class FoodRegisterViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Food Register """
    authentication_classes = []  # disables authentication
    permission_classes = []  # disables permission
    queryset = FoodRegister.objects.all()
    serializer_class = FoodRegiterSerializer
    # permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
