from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        return super().get_token(user)

    def validate(self, attrs):
        data = super().validate(attrs)

        profile = UserProfile.objects.get(user=self.user)

        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "email": self.user.email,
            "role": profile.role,
            "is_verified_owner": profile.is_verified_owner,
        }

        return data


class RegisterSerializer(serializers.ModelSerializer):

    phone = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(
        choices=UserProfile.ROLE_CHOICES,
        write_only=True
    )
    confirm_password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User

        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'password',
            'confirm_password',
            'phone',
            'address',
            'role',
        ]

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def validate(self, data):

        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

        return data

    def create(self, validated_data):

        phone = validated_data.pop('phone')
        address = validated_data.pop('address')
        role = validated_data.pop('role')
        validated_data.pop('confirm_password')

        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        UserProfile.objects.create(
            user=user,
            phone=phone,
            address=address,
            role=role,
            is_verified_owner=False
        )

        return user
    

class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = UserProfile
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'role',
            'phone',
            'address',
            'is_verified_owner',
        ]