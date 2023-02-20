from rest_framework import permissions

class IsFarmerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_farmer

class IsConsumer(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_consumer
