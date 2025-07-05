from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from campeonato import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from campeonato.views import tabla_posiciones_view, calendario_view

# CRUD con routers automáticos
router = DefaultRouter()
router.register(r'torneos', views.TorneoViewSet)
router.register(r'etapas', views.EtapaViewSet)
router.register(r'grupos', views.GrupoViewSet)
router.register(r'equipos', views.EquipoViewSet)
router.register(r'jugadores', views.JugadorViewSet)
router.register(r'canchas', views.CanchaViewSet)
router.register(r'arbitros', views.ArbitroViewSet)
router.register(r'partidos', views.PartidoViewSet)
router.register(r'eventos', views.EventoPartidoViewSet)
router.register(r'tablas', views.TablaPosicionViewSet)

# Lista completa de URLs
urlpatterns = [
    path('admin/', admin.site.urls),

    # CRUD API
    path('api/', include(router.urls)),

    # JWT Login
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Endpoints públicos
    path('api/public/tabla-posiciones/<int:torneo_id>/', tabla_posiciones_view),
    path('api/public/calendario/<int:etapa_id>/', calendario_view),
]


