from django.urls import include, path

from . import views

urlpatterns = [
    # path('1111/', views.make_api_requests, name="make_api_requests"),
    path("", views.index, name="index"),
]