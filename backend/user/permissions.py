from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    """Allows access only to authenticated users with the OWNER profile role."""

    message = "Only property owners can perform this action."

    def has_permission(self, request, view):
        profile = getattr(request.user, "profile", None)
        return bool(profile and profile.role == "OWNER")


class IsVerifiedOwner(IsOwner):
    """Allows property publishing only after the owner's profile is verified."""

    message = "Your owner account must be verified before you can create properties."

    def has_permission(self, request, view):
        profile = getattr(request.user, "profile", None)
        return bool(profile and profile.role == "OWNER" and profile.is_verified_owner)
