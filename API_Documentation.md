# Documentación API

## Listado de opciones de API

https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help

## Obtener todas las Gasolineras de España

Para obtener todas las gasolineras de España, utilizamos la siguiente url:

```
https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/15-01-2025
```

## Obtener Gasolineras de la Comunidad Autónoma de Valencia

Para obtener las gasolineras de la Comunidad Autónoma de Valencia, utiliza la siguiente URL:

```
https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/FiltroCCAA/15-01-2025/10
```

**Nota:** La fecha más reciente es siempre la del día anterior.

### Campo Horario

El campo `Horario` contiene el horario de apertura de la gasolinera en formato de texto libre. Formatos comunes:

- `"L-D: 06:30-22:00"` — Lunes a Domingo, mismo horario
- `"L-V: 06:00-22:00; S: 07:00-22:00; D: 07:30-22:00"` — Horarios diferentes por día
- `"06:00-02:00"` — Horario que cruza medianoche (cierra a las 2:00 AM del día siguiente)
- `"24h"` — Apertura las 24 horas

Los códigos de días son: `L` (Lunes), `M` (Martes), `X` (Miércoles), `J` (Jueves), `V` (Viernes), `S` (Sábado), `D` (Domingo).

### IDs de las Comunidades Autónomas

A continuación se listan los IDs de las Comunidades Autónomas:

- **01** Andalucía
- **02** Aragón
- **03** Asturias
- **04** Baleares
- **05** Canarias
- **06** Cantabria
- **07** Castilla-La Mancha
- **08** Castilla y León
- **09** Cataluña
- **10** Valencia
- **11** Extremadura
- **12** Galicia
- **13** Madrid
- **14** Murcia
- **15** Navarra
- **16** País Vasco
- **17** La Rioja
- **18** Ceuta
- **19** Melilla
