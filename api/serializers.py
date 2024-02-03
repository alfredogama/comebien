from rest_framework import serializers
from dbcore.models import *
from sorl.thumbnail import get_thumbnail


class DailyFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodRegister
        fields = '__all__'
        read_only_fields = ['schedule', 'family', "owner"]


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name']


class FoodUpdateImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['photo']


class FoodFullSerializer(serializers.ModelSerializer):

    ocurrencias = serializers.IntegerField(read_only=True)

    class Meta:
        model = Food
        fields = ['id', 'name', 'photo', 'ocurrencias']


class FoodRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodRegister
        fields = '__all__'


class FoodListSerializer(serializers.ModelSerializer):
    foto_miniatura = serializers.SerializerMethodField()

    class Meta:
        model = FoodRegister
        fields = ['owner', 'created_at',
                  'food_1', 'photo_1', 'foto_miniatura',
                  'schedule', 'family']

    def get_foto_miniatura(self, obj):
        if obj.photo_1:
            thumbnail = get_thumbnail(obj.photo_1, '300x300', crop='center', quality=99)
            return self.context['request'].build_absolute_uri(thumbnail.url)
        return None
