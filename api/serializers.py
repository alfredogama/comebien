from django.contrib.auth.models import User, Group
from rest_framework import serializers
from dbcore.models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'
        read_only_fields = ('id',)


class FoodRegiterSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Education model """
    owner = serializers.ReadOnlyField(source='owner.username')
    owner_id = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = FoodRegister
        photo_1 = serializers.ImageField(required=False, use_url=True)
        fields = ('id',
                  'owner',
                  'owner_id',
                  'created_at',
                  'food_1',
                  'photo_1',
                  'schedule',
                  'family',)
        read_only_fields = ('id',)

        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())])

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password_repeat = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password',
                  'password_repeat', 'first_name', 'last_name', ]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_repeat']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match"})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
        )

        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']

        user.set_password(validated_data['password'])
        user.save()

        return user
