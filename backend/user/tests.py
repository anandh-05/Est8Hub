from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from .models import UserProfile


class LoginResponseTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="tenant", password="safe-password-123")
        UserProfile.objects.create(user=self.user, role="TENANT")
        self.client = APIClient()

    def test_login_includes_tokens_and_user_role(self):
        response = self.client.post(
            "/api/login/",
            {"username": "tenant", "password": "safe-password-123"},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["user"]["username"], "tenant")
        self.assertEqual(response.data["user"]["role"], "TENANT")

    def test_owner_login_includes_owner_role(self):
        owner = User.objects.create_user(username="owner", password="safe-password-123")
        UserProfile.objects.create(user=owner, role="OWNER", is_verified_owner=True)

        response = self.client.post(
            "/api/login/",
            {"username": "owner", "password": "safe-password-123"},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["user"]["role"], "OWNER")
        self.assertTrue(response.data["user"]["is_verified_owner"])
