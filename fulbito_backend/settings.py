from pathlib import Path
from decouple import config

# BASE_DIR = carpeta principal del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY y DEBUG desde el archivo .env
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=True, cast=bool)

ALLOWED_HOSTS = ['*']  # Permitir todas las conexiones (para desarrollo)

# Aplicaciones instaladas
INSTALLED_APPS = [
    # Django por defecto
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Terceros
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # Tu app
    'campeonato',
]

# Middleware (orden importa)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # debe ir primero
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'fulbito_backend.urls'

# Plantillas
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'fulbito_backend.wsgi.application'

# Base de datos SQLite (puedes cambiar a PostgreSQL después)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Configuración de Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# Permitir llamadas desde cualquier origen (CORS)
CORS_ALLOW_ALL_ORIGINS = True

# Zona horaria y configuración local
LANGUAGE_CODE = 'es-pe'
TIME_ZONE = 'America/Lima'

USE_I18N = True
USE_TZ = True

# Archivos estáticos
STATIC_URL = 'static/'

# ID automático para las tablas
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Agrega esto al final del archivo settings.py

import os

ALLOWED_HOSTS = ['*']

CORS_ALLOW_ALL_ORIGINS = True  # Si estás usando django-cors-headers
