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
            get_face_data() 
            return
        else :    
            dataArray = data.get('results')
           
            for item in dataArray:             
                  ReplicateData.objects.update_or_create(
                        key=count, defaults={ 
                            'image_url':item.get('cover_image_url', ''),
                            'owner':item.get('owner', ''),
                            'name':item.get('name', ''),
                            'description':item.get('description', ''),
                            'category':'replicate',
                            'url':item.get('url', '')}     
                    )
                  count=count+1         
            get_data(next)  
   
def get_face_data(): 
     global count
     response = requests.get('https://huggingface.co/api/spaces?full=full&direction=-1&sort=likes&limit=5000&query=asdf')  
     if response.status_code == 200:
           dataArray = response.json()
           for item in dataArray: 
                  cardData = item.get('cardData', '')
                  if isinstance(cardData, dict):  # Check if cardData is a dictionary
                      image_url = cardData.get('emoji', '')
                      name = cardData.get('title', '')
                  else:
                      image_url = ''
                      name = ''          
                  ReplicateData.objects.update_or_create(
                        key=count, defaults={ 
                            'image_url': image_url,
                            'owner': '',
                            'name': name,
                            'description': item.get('id', ''),
                            'category': 'face-hug',
                            'url': item.get('subdomain', '')}     
                    )
                  count=count+1 
     count=1 