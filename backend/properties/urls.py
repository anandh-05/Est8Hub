from django.urls import path

from .views import (
    PropertyListView,
    PropertyDetailView,
    MyPropertiesView,
    PropertyCreateView,
)

urlpatterns = [
    path("", PropertyListView.as_view()),
    path("<int:pk>/", PropertyDetailView.as_view()),
    path("my-properties/", MyPropertiesView.as_view()),
    path("create/", PropertyCreateView.as_view()),
]