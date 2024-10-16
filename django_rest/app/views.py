from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Usuario
from .serializers import UsuarioSerializer
from django.contrib.auth.hashers import make_password, check_password  # Para manejar contraseñas

# Vista para la gestión CRUD de usuarios
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        # Encriptar la contraseña antes de guardar el usuario
        data = request.data.copy()  # Hacemos una copia de los datos enviados
        data['password'] = make_password(data['password'])  # Cifrar la contraseña
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Vista para registrar un nuevo usuario
class RegisterView(APIView):
    def post(self, request):
        # Extraer datos del request
        nombre = request.data.get('nombre')
        email = request.data.get('email')
        password = request.data.get('password')

        # Validar datos (aquí podrías agregar más validaciones según tus necesidades)
        if not nombre or not email or not password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el usuario ya existe
        if Usuario.objects.filter(nombre=nombre).exists():
            return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear nuevo usuario
        usuario = Usuario(
            nombre=nombre,
            email=email,
            password=make_password(password)  # Cifrar la contraseña
        )
        usuario.save()  # Guardar el usuario en la base de datos

        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

# Vista para el login con nombre y password
class LoginView(APIView):
    def post(self, request):
        nombre = request.data.get('nombre')
        password = request.data.get('password')

        # Verificar si el usuario existe con ese nombre
        try:
            usuario = Usuario.objects.get(nombre=nombre)
            
            # Si las contraseñas están cifradas, usamos check_password para verificar
            if check_password(password, usuario.password):
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
        except Usuario.DoesNotExist:
            return Response({'error': 'Invalid username'}, status=status.HTTP_400_BAD_REQUEST)
