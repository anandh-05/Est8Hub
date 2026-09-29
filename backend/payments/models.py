from django.db import models
from user.models import UserProfile
from properties.models import Property
from bookings.models import Booking


class Payment(models.Model):

    PAYMENT_TYPES = (
        ('ADVANCE', 'Advance Payment'),
        ('MONTHLY_RENT', 'Monthly Rent'),
    )

    PAYMENT_STATUS = (
        ('PENDING', 'Pending'),
        ('SUCCESS', 'Success'),
        ('FAILED', 'Failed'),
    )

    PAYMENT_METHODS = (
        ('UPI', 'UPI'),
        ('CARD', 'Card'),
        ('NET_BANKING', 'Net Banking'),
        ('CASH', 'Cash'),
    )

    booking = models.ForeignKey(
        Booking,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    tenant = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='payments'
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    payment_type = models.CharField(
        max_length=20,
        choices=PAYMENT_TYPES
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default='PENDING'
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHODS
    )

    transaction_id = models.CharField(
        max_length=100,
        unique=True
    )

    paid_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.tenant.user.username} - {self.payment_type}"