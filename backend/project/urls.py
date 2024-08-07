from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProjectListView.as_view(), name='project-list'),
    path('create/', views.ProjectCreateView.as_view(), name='project-create'),
    path('update/<int:pk>/', views.ProjectUpdateView.as_view(), name='project-update'),
    path('delete/<int:pk>/', views.ProjectDeleteView.as_view(), name='project-delete'),

    path('<int:project_id>/todos/', views.TodoListView.as_view(), name='todo-list'),
    path('<int:project_id>/todos/create/', views.TodoCreateView.as_view(), name='todo-create'),
    path('todos/<int:pk>/update/', views.TodoUpdateView.as_view(), name='todo-update'),
    path('todos/<int:pk>/delete/', views.TodoDeleteView.as_view(), name='todo-delete'),
    path('todos/<int:pk>/complete/', views.TodoStatusUpdateView.as_view(), name='todo-complete'),
]
