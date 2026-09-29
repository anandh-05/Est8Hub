from django.db import models
from user.models import UserProfile


class Notification(models.Model):

    NOTIFICATION_TYPES = (
        ('BOOKING', 'Booking'),
        ('PAYMENT', 'Payment'),
        ('SYSTEM', 'System'),
    )

    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='notifications'
    )

    title = models.CharField(
        max_length=200
    )

    message = models.TextField()

    notification_type = models.CharField(
        max_length=20,
        choices=NOTIFICATION_TYPES
    )

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.user.username} - {self.title}"