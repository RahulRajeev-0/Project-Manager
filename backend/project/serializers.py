# serializers.py
from rest_framework import serializers
from .models import Project, Todo

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'created_at', 'updated_at']  # Exclude 'created_by' from the input fields
        read_only_fields = ['id', 'created_at', 'updated_at', 'created_by']  # Make 'created_by' read-only


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'