import requests
from django.http import HttpResponse
from django.http import JsonResponse
from replicate.models import ReplicateData
from requests.exceptions import ConnectTimeout
import time
import gradio as gr


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

    
