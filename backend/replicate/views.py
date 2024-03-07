from django.shortcuts import render
import requests
from django.http import HttpResponse
from django.http import JsonResponse
from replicate.models import ReplicateData
from requests.exceptions import ConnectTimeout
import time
import gradio as gr


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def greet(name, intensity):
    return "Hello, " + name + "!" * int(intensity)

def build_interface(data):
    inputs =[]
    schema =data.get("latest_version", {}).get("openapi_schema", {}).get("components", {}).get("schemas", {})
    for property_name, property_info in schema.get("Input", {}).get("properties", {}).items():
        print(property_name, property_info)
        if "x-order" in property_info:
            order = int(property_info.get('x-order',''))
            print(order)
            if property_info.get("type", {}) == "integer":
               inputs.insert(order, gr.Number(label=property_name, info=property_info.get('description', '')))
              
            elif property_info.get("type", {}) == "string":
                inputs.insert(order, gr.Textbox(label=property_info.get('title', ''), info=property_info.get('description', '')))
            else:
                options=schema.get(property_name,'').get('enum',[])
                inputs.insert(order, gr.Dropdown(label=property_info.get('title', ''), choices=options, value=property_info.get("default", '')))
    title=data.get('owner','')+'/'+data.get('name','')
    interface = gr.Interface(greet,inputs,outputs=["text"],title=title, description=data.get('description',''))  # Outputs can be added if needed
    return interface

def get_data(request):
    owner = request.GET.get('owner')
    name = request.GET.get('name')
    headers = {   
        'Content-Type': 'application/json',
        'Authorization': 'Token r8_ZGZlzThfRkPZVDMygVclY1XZ9AuxmIQ2qwwPP',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": '**',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"}
    max_retries = 3
    retry_delay = 2
    for retry in range(max_retries):
       try:
          url = f'https://api.replicate.com/v1/models/{owner}/{name}'
          response = requests.get(url,  headers=headers, timeout=10)
        # Process the response
          break  # Break out of the loop if the request is successful
       except ConnectTimeout:
        if retry < max_retries - 1:
            print(f"Connection timed out. Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)
        else:
            print("Max retries exceeded. Unable to establish connection.")

    schema = response.json()
    interface=build_interface(schema)
    interface.launch()

    return HttpResponse()
    
