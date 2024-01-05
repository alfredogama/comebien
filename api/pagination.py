from rest_framework.pagination import PageNumberPagination


class FoodPagination(PageNumberPagination):
    page_size = 10  # Tamaño de página específico para la vista de alimentos
    page_size_query_param = 'page_size'
    max_page_size = 100
