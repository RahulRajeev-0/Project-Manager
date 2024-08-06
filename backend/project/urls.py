from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProjectListView.as_view(), name='project-list'),
    path('create/', views.ProjectCreateView.as_view(), name='project-create'),
    path('projects/update/<int:pk>/', views.ProjectUpdateView.as_view(), name='project-update'),
    path('delete/<int:pk>/', views.ProjectDeleteView.as_view(), name='project-delete'),
]
