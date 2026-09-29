from django.contrib import admin
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'tenant',
        'property',
        'amount',
        'payment_type',
        'payment_status',
        'payment_method',
        'paid_at',
    )

    list_filter = (
        'payment_type',
        'payment_status',
        'payment_method',
    )

    search_fields = (
        'tenant__user__username',
        'property__title',
        'transaction_id',
    )

    readonly_fields = (
        'created_at',
        'updated_at',
    )