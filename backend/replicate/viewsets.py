from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from replicate.models import ReplicateData
from replicate.serializers import ReplicateSerializer

class ReplicateViewSet(viewsets.ModelViewSet):
    queryset = ReplicateData.objects.all().order_by('key')
    serializer_class = ReplicateSerializer
    permission_classes = [AllowAny]