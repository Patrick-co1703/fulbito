from django.db import models

class Torneo(models.Model):
    nombre = models.CharField(max_length=100)
    temporada = models.IntegerField()
    descripcion = models.TextField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    def __str__(self):
        return f"{self.nombre} ({self.temporada})"

    class Meta:
        verbose_name = "Torneo"
        verbose_name_plural = "Torneos"

class Etapa(models.Model):
    nombre = models.CharField(max_length=50)
    orden = models.IntegerField()
    torneo = models.ForeignKey(Torneo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre} - {self.torneo.nombre}"

    class Meta:
        verbose_name = "Etapa"
        verbose_name_plural = "Etapas"

class Grupo(models.Model):
    nombre = models.CharField(max_length=50)
    etapa = models.ForeignKey(Etapa, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre} - {self.etapa.nombre}"

    class Meta:
        verbose_name = "Grupo"
        verbose_name_plural = "Grupos"

class Equipo(models.Model):
    nombre = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    entrenador = models.CharField(max_length=100)
    fundacion = models.DateField()
    grupo = models.ForeignKey(Grupo, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Equipo"
        verbose_name_plural = "Equipos"

class Jugador(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField()
    posicion = models.CharField(max_length=50)
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"

    class Meta:
        verbose_name = "Jugador"
        verbose_name_plural = "Jugadores"

class Cancha(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    capacidad = models.IntegerField()

    def __str__(self):
        return f"{self.nombre} - {self.ciudad}"

    class Meta:
        verbose_name = "Cancha"
        verbose_name_plural = "Canchas"

class Arbitro(models.Model):
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.categoria})"

    class Meta:
        verbose_name = "Árbitro"
        verbose_name_plural = "Árbitros"

class Partido(models.Model):
    fecha_hora = models.DateTimeField()
    equipo_local = models.ForeignKey(Equipo, on_delete=models.CASCADE, related_name='local')
    equipo_visitante = models.ForeignKey(Equipo, on_delete=models.CASCADE, related_name='visitante')
    cancha = models.ForeignKey(Cancha, on_delete=models.CASCADE)
    arbitro = models.ForeignKey(Arbitro, on_delete=models.SET_NULL, null=True, blank=True)
    goles_local = models.IntegerField(default=0)
    goles_visitante = models.IntegerField(default=0)
    etapa = models.ForeignKey(Etapa, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.equipo_local.nombre} vs {self.equipo_visitante.nombre}"

    class Meta:
        verbose_name = "Partido"
        verbose_name_plural = "Partidos"

class EventoPartido(models.Model):
    partido = models.ForeignKey(Partido, on_delete=models.CASCADE)
    jugador = models.ForeignKey(Jugador, on_delete=models.CASCADE)
    minuto = models.IntegerField()
    tipo_evento = models.CharField(max_length=50)
    descripcion = models.TextField()

    def __str__(self):
        return f"{self.tipo_evento} - {self.jugador} ({self.minuto}')"

    class Meta:
        verbose_name = "Evento del partido"
        verbose_name_plural = "Eventos del partido"

class TablaPosicion(models.Model):
    equipo = models.ForeignKey(Equipo, on_delete=models.CASCADE)
    torneo = models.ForeignKey(Torneo, on_delete=models.CASCADE)
    jugados = models.IntegerField(default=0)
    ganados = models.IntegerField(default=0)
    empatados = models.IntegerField(default=0)
    perdidos = models.IntegerField(default=0)
    gf = models.IntegerField(default=0)
    gc = models.IntegerField(default=0)
    dg = models.IntegerField(default=0)
    puntos = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.equipo.nombre} - {self.puntos} pts"

    class Meta:
        verbose_name = "Tabla de posición"
        verbose_name_plural = "Tabla de posiciones"
