from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class FoodType(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )
        verbose_name = 'Tipo Comida'
        verbose_name_plural = 'Tipo de Comidas'


class Food(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='food', null=True, blank=True)
    type = models.ForeignKey(FoodType, related_name='types', on_delete=models.CASCADE)
    visible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )
        verbose_name = 'Comida'
        verbose_name_plural = 'Comidas'


class Family(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )
        verbose_name = 'Familia'
        verbose_name_plural = 'Familias'


class FoodRegister(models.Model):
    LIST_SCHEDULE = (
        ('DE', 'Desayuno'),
        ('AL', 'Almuerzo'),
        ('CO', 'Comida'),
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="food_register")
    created_at = models.DateTimeField(default=datetime.now)
    food_1 = models.ForeignKey(Food, related_name='food_1', on_delete=models.CASCADE)
    photo_1 = models.ImageField(upload_to='register', null=True, blank=True)
    food_2 = models.ForeignKey(Food, related_name='food_2', on_delete=models.CASCADE, null=True, blank=True)
    photo_2 = models.ImageField(upload_to='register', null=True, blank=True)
    food_3 = models.ForeignKey(Food, related_name='food_3', on_delete=models.CASCADE, null=True, blank=True)
    photo_3 = models.ImageField(upload_to='register', null=True, blank=True)
    schedule = models.CharField(max_length=2, choices=LIST_SCHEDULE)
    family = models.ForeignKey(Family, related_name='family_register', on_delete=models.CASCADE)

    def __str__(self):
        return self.created_at.strftime("%Y %m %d")

    class Meta:
        ordering = ('-created_at', )
        verbose_name = 'Registro Comida'
        verbose_name_plural = 'Registros de Comida'


class Member(models.Model):
    name = models.CharField(max_length=255, verbose_name="Apellidos y Nombres")
    birthday = models.DateField(null=True, blank=True)
    family = models.ForeignKey(Family, related_name='family', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )
        verbose_name = 'Miembro'
        verbose_name_plural = 'Miembros'