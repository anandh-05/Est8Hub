from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from user.models import UserProfile


PROPERTY_DATA = {
    "title": "Test Apartment",
    "description": "A test listing",
    "price": "25000.00",
    "location": "Chennai",
    "property_type": "APARTMENT",
    "area": 900,
}


class PropertyAuthorizationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        tenant_user = User.objects.create_user(username="tenant", password="safe-password-123")
        self.tenant = UserProfile.objects.create(user=tenant_user, role="TENANT")
        owner_user = User.objects.create_user(username="owner", password="safe-password-123")
        self.unverified_owner = UserProfile.objects.create(user=owner_user, role="OWNER")
        verified_owner_user = User.objects.create_user(username="verified-owner", password="safe-password-123")
        self.verified_owner = UserProfile.objects.create(
            user=verified_owner_user,
            role="OWNER",
            is_verified_owner=True,
        )

    def test_anonymous_and_tenant_cannot_create_property(self):
        self.assertEqual(self.client.post("/api/properties/create/", PROPERTY_DATA, format="json").status_code, 401)

        self.client.force_authenticate(user=self.tenant.user)
        self.assertEqual(self.client.post("/api/properties/create/", PROPERTY_DATA, format="json").status_code, 403)

    def test_only_verified_owner_can_create_property(self):
        self.client.force_authenticate(user=self.unverified_owner.user)
        self.assertEqual(self.client.post("/api/properties/create/", PROPERTY_DATA, format="json").status_code, 403)

        self.client.force_authenticate(user=self.verified_owner.user)
        response = self.client.post("/api/properties/create/", PROPERTY_DATA, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["owner"], "verified-owner")

    def test_my_properties_requires_owner_role(self):
        self.client.force_authenticate(user=self.tenant.user)
        self.assertEqual(self.client.get("/api/properties/my-properties/").status_code, 403)

        self.client.force_authenticate(user=self.verified_owner.user)
        self.assertEqual(self.client.get("/api/properties/my-properties/").status_code, 200)
