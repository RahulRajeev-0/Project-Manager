from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProjectListView.as_view(), name='project-list'),
    path('projects/create/', views.ProjectCreateView.as_view(), name='project-create'),
    path('projects/update/<int:pk>/', views.ProjectUpdateView.as_view(), name='project-update'),
    path('projects/delete_all/', views.ProjectDeleteAllView.as_view(), name='project-delete-all'),
]
