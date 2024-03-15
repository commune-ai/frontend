from rest_framework import serializers
from replicate.models import ReplicateData

class ReplicateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = ReplicateData
        fields = ['image_url', 'name', 'owner', 'description', 'category', 'url', 'key', 'id', 'colorfrom', 'colorto', 'likes', 'github_url']
        ready_only_fields = ['id']
