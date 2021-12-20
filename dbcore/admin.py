from django.contrib import admin
from django.contrib.admin import AdminSite
from .models import *
from django.utils.html import format_html
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

    def photo1_tag(self, obj):
        if obj.photo_1:
            return format_html('<img src="{}" width="150"/>'.format(obj.photo_1.url))
        else:
            return ""

    def photo2_tag(self, obj):
        if obj.photo_2:
            return format_html('<img src="{}" width="150"/>'.format(obj.photo_2.url))
        else:
            return ""

    def photo3_tag(self, obj):
        if obj.photo_3:
            return format_html('<img src="{}" width="150"/>'.format(obj.photo_3.url))
        else:
            return ""

    list_display = ('created_at', 'schedule', 'food_1', 'photo1_tag', 'food_2', 'photo2_tag', 'food_3', 'photo3_tag', 'family',)
