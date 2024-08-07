# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer
from rest_framework.exceptions import PermissionDenied
# Create a new project


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# Edit the name of a project
class ProjectUpdateView(generics.UpdateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        instance = serializer.save()
        instance.save()


# Get all projects created by current user
class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(created_by=self.request.user)
    

# Delete project
class ProjectDeleteView(generics.DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        try:
            project = self.get_object()
            # Check if the current user is the creator of the project
            if project.created_by != request.user:
                raise PermissionDenied("You do not have permission to delete this project.")
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)



# Create a new Todo
class TodoCreateView(generics.CreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        project_id = self.kwargs['project_id']
        try:
            project = Project.objects.get(id=project_id)
        except Exception as e:
            print(e)
            return Response({'message':"Unable to get the project"}, 
                            status=status.HTTP_404_NOT_FOUND)
        if project.created_by != self.request.user:
            raise PermissionDenied("You do not have permission to add todos to this project.")
        serializer.save(project=project)

# Edit the title of a Todo
class TodoUpdateView(generics.UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        todo = self.get_object()
        if todo.project.created_by != self.request.user:
            raise PermissionDenied("You do not have permission to edit this todo.")
        serializer.save()

# Delete a Todo
class TodoDeleteView(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        todo = self.get_object()
        if todo.project.created_by != request.user:
            raise PermissionDenied("You do not have permission to delete this todo.")
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Change the status of a Todo to completed
class TodoStatusUpdateView(generics.UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        todo = self.get_object()
        if todo.project.created_by != self.request.user:
            raise PermissionDenied("You do not have permission to change the status of this todo.")
        serializer.save(status='completed')


class TodoListView(generics.ListAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Todo.objects.filter(project_id=project_id)