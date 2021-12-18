from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import *
# Register your models here.
AdminSite.site_header = 'Come Bien'
AdminSite.site_title = 'Come Bien'


class MemberInline(admin.TabularInline):
    model = Member
    extra = 1


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'birthday', 'family',)


@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ('name',)
    inlines = [MemberInline, ]


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'photo', 'type', 'visible')


@admin.register(FoodType)
class FoodTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(FoodRegister)
class FoodRegisterAdmin(admin.ModelAdmin):
    list_display = ('created_at', 'schedule', 'food_1', 'food_2', 'food_3', 'family',)
