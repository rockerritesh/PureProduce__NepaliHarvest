from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_admin

class IsFarmer(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and user.status == 'active' and user.is_admin == False