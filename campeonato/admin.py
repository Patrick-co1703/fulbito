from django.contrib import admin
from .models import (
    Torneo, Etapa, Grupo, Equipo, Jugador,
    Cancha, Arbitro, Partido, EventoPartido, TablaPosicion
)

admin.site.register(Torneo)
admin.site.register(Etapa)
admin.site.register(Grupo)
admin.site.register(Equipo)
admin.site.register(Jugador)
admin.site.register(Cancha)
admin.site.register(Arbitro)
admin.site.register(Partido)
admin.site.register(EventoPartido)
admin.site.register(TablaPosicion)

