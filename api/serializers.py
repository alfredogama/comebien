from django.contrib.auth.models import User, Group
from rest_framework import serializers
from dbcore.models import *


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
        read_only_fields = ('id',)


class FoodRegiterSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Education model """

    class Meta:
        model = FoodRegister
        photo_1 = serializers.ImageField(required=False, use_url=True)
        fields = ('id',
                  'created_at',
                  'food_1',
                  'photo_1',
                  'schedule',
                  'family',)
        read_only_fields = ('id',)

