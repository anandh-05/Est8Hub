from django.contrib import admin
from .models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'tenant',
        'property',
        'visit_date',
        'visit_time',
        'status',
    )

    list_filter = (
        'status',
        'visit_date',
    )

    search_fields = (
        'tenant__user__username',
        'property__title',
    )