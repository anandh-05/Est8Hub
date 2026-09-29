from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated

from .models import Property
from .serializers import PropertySerializer

from user.models import UserProfile


class PropertyListView(generics.ListAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [AllowAny]


class PropertyDetailView(generics.RetrieveAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [AllowAny]


class MyPropertiesView(generics.ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user.profile)

class PropertyCreateView(generics.CreateAPIView):
    serializer_class = PropertySerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user.profile)