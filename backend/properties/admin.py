from django.contrib import admin
from .models import Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 3


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'owner',
        'property_type',
        'price',
        'status'
    )

    list_filter = (
        'property_type',
        'status'
    )

    search_fields = (
        'title',
        'location'
    )

    inlines = [PropertyImageInline]


@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'property_id',
        'property_title',
        'image'
    )

    def property_id(self, obj):
        return obj.property.id

    property_id.short_description = "Property ID"

    def property_title(self, obj):
        return obj.property.title

    property_title.short_description = "Property Title"