from django.db import models
from user.models import UserProfile


class Property(models.Model):

    PROPERTY_TYPES = (
        ('APARTMENT', 'Apartment'),
        ('HOUSE', 'House'),
        ('LAND', 'Land'),
    )

    STATUS_CHOICES = (
        ('AVAILABLE', 'Available'),
        ('BOOKED', 'Booked'),
        ('RENTED', 'Rented'),
    )

    owner = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        related_name='properties'
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    location = models.CharField(max_length=255)

    google_map_url = models.URLField(
        blank=True,
        null=True
    )

    property_type = models.CharField(
        max_length=20,
        choices=PROPERTY_TYPES
    )

    bedrooms = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    bathrooms = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    area = models.PositiveIntegerField(
        help_text="Area in square feet"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='AVAILABLE'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title

def property_image_path(instance,filename):
    return f'properties/{instance.property.id}/{filename}'


class PropertyImage(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to=property_image_path
    )

    def __str__(self):
        return f"{self.property.title} Image"