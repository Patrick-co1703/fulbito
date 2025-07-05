from rest_framework import serializers
from .models import (
    Torneo, Etapa, Grupo, Equipo, Jugador,
    Cancha, Arbitro, Partido, EventoPartido, TablaPosicion
)

class TorneoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Torneo
        fields = '__all__'

class EtapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etapa
        fields = '__all__'

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = '__all__'

class EquipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipo
        fields = '__all__'

class JugadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jugador
        fields = '__all__'

class CanchaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cancha
        fields = '__all__'

class ArbitroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arbitro
        fields = '__all__'

class PartidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partido
        fields = '__all__'

class EventoPartidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoPartido
        fields = '__all__'

class TablaPosicionSerializer(serializers.ModelSerializer):
    equipo_nombre = serializers.CharField(source='equipo.nombre', read_only=True)

    class Meta:
        model = TablaPosicion
        fields = [
            'id', 'jugados', 'ganados', 'empatados', 'perdidos',
            'gf', 'gc', 'dg', 'puntos', 'equipo', 'equipo_nombre', 'torneo'
        ]
