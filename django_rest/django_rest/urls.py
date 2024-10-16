from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views import UsuarioViewSet, LoginView, RegisterView  # Importar también la vista de registro

# Registrar el ViewSet para la API de usuarios
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Rutas para el CRUD de usuarios
    path('api/login/', LoginView.as_view(), name='login'),  # Ruta para el login
    path('api/register/', RegisterView.as_view(), name='register'),  # Ruta para el registro
]
