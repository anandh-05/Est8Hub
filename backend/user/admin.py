from django.contrib import admin
from .models import UserProfile

from django.contrib import admin
from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'user',
        'role',
        'phone',
        'is_verified_owner',
        'created_at',
    )


admin.site.register(UserProfile,UserProfileAdmin)