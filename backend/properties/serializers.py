from rest_framework import serializers
from .models import Property, PropertyImage

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image"]


class PropertySerializer(serializers.ModelSerializer):

    owner = serializers.CharField(
        source="owner.user.username",
        read_only=True
    )

    images = PropertyImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Property
        fields = "__all__"