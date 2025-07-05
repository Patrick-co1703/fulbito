from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    Torneo, Etapa, Grupo, Equipo, Jugador,
    Cancha, Arbitro, Partido, EventoPartido, TablaPosicion
)
from .serializers import (
    TorneoSerializer, EtapaSerializer, GrupoSerializer,
    EquipoSerializer, JugadorSerializer, CanchaSerializer,
    ArbitroSerializer, PartidoSerializer, EventoPartidoSerializer,
    TablaPosicionSerializer
)

# CRUD ViewSets
class TorneoViewSet(viewsets.ModelViewSet):
    queryset = Torneo.objects.all()
    serializer_class = TorneoSerializer

class EtapaViewSet(viewsets.ModelViewSet):
    queryset = Etapa.objects.all()
    serializer_class = EtapaSerializer

class GrupoViewSet(viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer

class EquipoViewSet(viewsets.ModelViewSet):
    queryset = Equipo.objects.all()
    serializer_class = EquipoSerializer

class JugadorViewSet(viewsets.ModelViewSet):
    queryset = Jugador.objects.all()
    serializer_class = JugadorSerializer

class CanchaViewSet(viewsets.ModelViewSet):
    queryset = Cancha.objects.all()
    serializer_class = CanchaSerializer

class ArbitroViewSet(viewsets.ModelViewSet):
    queryset = Arbitro.objects.all()
    serializer_class = ArbitroSerializer

class PartidoViewSet(viewsets.ModelViewSet):
    queryset = Partido.objects.all()
    serializer_class = PartidoSerializer

class EventoPartidoViewSet(viewsets.ModelViewSet):
    queryset = EventoPartido.objects.all()
    serializer_class = EventoPartidoSerializer

class TablaPosicionViewSet(viewsets.ModelViewSet):
    queryset = TablaPosicion.objects.all()
    serializer_class = TablaPosicionSerializer

# Endpoints públicos
@api_view(['GET'])
def tabla_posiciones_view(request, torneo_id):
    tabla = TablaPosicion.objects.filter(torneo_id=torneo_id).order_by('-puntos', '-dg')
    serializador = TablaPosicionSerializer(tabla, many=True)
    return Response(serializador.data)

@api_view(['GET'])
def calendario_view(request, etapa_id):
    partidos = Partido.objects.filter(etapa_id=etapa_id).order_by('fecha_hora')
    serializador = PartidoSerializer(partidos, many=True)
    return Response(serializador.data)
