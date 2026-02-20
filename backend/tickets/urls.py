from django.urls import path
from . import views

urlpatterns = [
    path('', views.TicketListCreateView.as_view(), name='ticket-list-create'),
    path('<int:pk>/', views.TicketRetrieveUpdateView.as_view(), name='ticket-detail-update'),
    path('stats/', views.TicketStatsView.as_view(), name='ticket-stats'),
    path('classify/', views.TicketClassifyView.as_view(), name='ticket-classify'),
]