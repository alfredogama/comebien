from rest_framework import serializers
from dbcore.models import *


class DailyFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodRegister
        fields = '__all__'
        read_only_fields = ['schedule', 'family', "owner"]


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name']


class FoodFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'


class FoodRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodRegister
        fields = '__all__'
