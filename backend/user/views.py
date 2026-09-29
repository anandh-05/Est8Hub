from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
from .serializers import RegisterSerializer,ProfileSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveAPIView):

    serializer_class = ProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)


    