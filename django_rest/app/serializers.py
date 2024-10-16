from rest_framework import serializers
from .models import Usuario
from django.contrib.auth.hashers import make_password  # Para cifrar las contraseñas

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'password']  # Incluye todos los campos necesarios
        # No se incluye extra_kwargs para password, lo que permite que se muestre en las respuestas

    def create(self, validated_data):
        # Cifrar la contraseña antes de crear el usuario
        validated_data['password'] = make_password(validated_data['password'])
        return super(UsuarioSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        # Cifrar la contraseña si está en los datos validados
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super(UsuarioSerializer, self).update(instance, validated_data)
