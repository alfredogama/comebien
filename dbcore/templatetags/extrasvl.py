from django import template
register = template.Library()


@register.filter(name='diadesemana')
def diadesemana(value):
    """Devolver el dia de la semana en Español"""
    dia_de_desama = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    return dia_de_desama[int(value)]
