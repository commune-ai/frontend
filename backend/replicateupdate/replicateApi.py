import requests
from django.http import HttpResponse
from replicate.models import ReplicateData
# Create your views here.
global count
count=1

def make_api_requests():
     get_data('https://api.replicate.com/v1/models') 
     
def get_data(str):
    global count
    headers = {   
        'Content-Type': 'application/json',
        'Authorization': 'Token r8_ZGZlzThfRkPZVDMygVclY1XZ9AuxmIQ2qwwPP',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": '**',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"}
    response = requests.get(str, headers=headers)  
    if response.status_code == 200:
        data = response.json()
        next = data.get('next')
        if next is None:
            count=1
            return
        else :    
            dataArray = data.get('results')
           
            for item in dataArray:             
                  ReplicateData.objects.update_or_create(
                        key=count, defaults={ 'image_url':item.get('cover_image_url', ''),
                            'owner':item.get('owner', ''),
                            'name':item.get('name', ''),
                            'description':item.get('description', ''),
                            'run_count':item.get('run_count', 0),
                            'url':item.get('url', '')}     
                    )
                  count=count+1         
            get_data(next)  
   
   