from rest_framework import routers
from replicate.viewsets import ReplicateViewSet

router = routers.SimpleRouter()

router.register('replicate', ReplicateViewSet, basename='replicate')

urlpatterns = router.urls