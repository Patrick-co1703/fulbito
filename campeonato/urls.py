from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    TorneoViewSet, EtapaViewSet, GrupoViewSet, EquipoViewSet, JugadorViewSet,
    CanchaViewSet, ArbitroViewSet, PartidoViewSet, EventoPartidoViewSet,
    TablaPosicionViewSet, tabla_posiciones_view, calendario_view
)

router = DefaultRouter()
router.register(r'torneos', TorneoViewSet)
router.register(r'etapas', EtapaViewSet)
router.register(r'grupos', GrupoViewSet)
router.register(r'equipos', EquipoViewSet)
router.register(r'jugadores', JugadorViewSet)
router.register(r'canchas', CanchaViewSet)
router.register(r'arbitros', ArbitroViewSet)
router.register(r'partidos', PartidoViewSet)
router.register(r'eventos', EventoPartidoViewSet)
router.register(r'tablas', TablaPosicionViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # Endpoints públicos
    path('public/tabla-posiciones/<int:torneo_id>/', tabla_posiciones_view),
    path('public/calendario/<int:etapa_id>/', calendario_view),
]
