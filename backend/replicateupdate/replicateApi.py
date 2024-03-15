import requests
from django.http import HttpResponse
from replicate.models import ReplicateData
from requests.exceptions import ConnectTimeout
import time
# Create your views here.
global count
count=1

def make_api_requests():
    #get_data('https://api.replicate.com/v1/models')
     get_list_collection()
     get_face_data()
    
def get_data(str):
    global count
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
          response = requests.get(str,  headers=headers, timeout=10)
        # Process the response
          break  # Break out of the loop if the request is successful
       except ConnectTimeout:
        if retry < max_retries - 1:
            print(f"Connection timed out. Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)
        else:
            print("Max retries exceeded. Unable to establish connection.")
    if response.status_code == 200:
        data = response.json()
        next = data.get('next')
        if next is None:
            
            return
        else :    
            dataArray = data.get('results')
           
            for item in dataArray:  
                  print(item.get('cover_image_url', ''))           
                  ReplicateData.objects.update_or_create(
                        key=count, defaults={ 
                            'image_url':item.get('cover_image_url', ''),
                            'owner':item.get('owner', ''),
                            'name':item.get('name', ''),
                            'description':item.get('description', ''),
                            'category':'replicate',
                            'url':item.get('url', ''),
                            'likes':item.get('run_count', ''),
                            'github_url': item.get('github_url', ''),
                            }     
                    )
                  count=count+1         
            get_data(next)  

def get_list_collection():
    global count
    headers = {   
        'Content-Type': 'application/json',
        'Authorization': 'Token r8_ZGZlzThfRkPZVDMygVclY1XZ9AuxmIQ2qwwPP',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": '**',
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"}
    max_retries = 3
    retry_delay = 2

    slug = [
         {
             "name": "text-to-image",
             "repo": "commune-ai"
         },
          {
             "name": "embedding-models",
             "repo": "commune-ai"
         },
        
          {
             "name": "image-editing",
             "repo": "edit-image"
         },
          {
             "name": "image-restoration",
             "repo": "restore-images"
         },
          {
             "name": "image-to-text",
             "repo": "cation-image"
         },
          {
             "name": "vision-models",
             "repo": "cation-image"
         },
          {
             "name": "language-models",
             "repo": "language-model"
         },
          {
             "name":  "audio-generation" ,
             "repo": "generate-music"
         }

    ]
    for item in slug:
        name = item.get("name",'')
        pro = item.get("repo",'')
        url= f'https://api.replicate.com/v1/collections/{name}'
        print(url)
        response = requests.get(url,headers=headers, timeout=10)
        print(response.status_code)
        if response.status_code == 200:
            data = response.json() 
            dataArray = data.get('models')
            for item in dataArray: 
                domain = pro +'-'+ item.get('owner', '') +'-'+ item.get('name', '')          
                ReplicateData.objects.update_or_create(
                    key=count, defaults={ 
                    'image_url':item.get('cover_image_url', ''),
                    'owner':item.get('owner', ''),
                    'name':item.get('name', ''),
                    'description':item.get('description', ''),
                    'category':'replicate',
                    'url':domain,
                    'likes':item.get('run_count', ''),
                    'github_url': item.get('github_url', ''),
                        }     
                        )
                count=count+1         
   

def  get_collections_models():
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
          response = requests.get('https://api.replicate.com/v1/collections',  headers=headers, timeout=10)
        # Process the response
          break  # Break out of the loop if the request is successful
       except ConnectTimeout:
        if retry < max_retries - 1:
            print(f"Connection timed out. Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)
        else:
            print("Max retries exceeded. Unable to establish connection.")

    if response.status_code == 200:
       data = response.json()
       return data.get('results',{})


def get_face_data(): 
     global count
     max_retries = 3
     retry_delay = 2
     print("app")
     for retry in range(max_retries):
       try:
           response = requests.get('https://huggingface.co/api/spaces?full=full&direction=-1&sort=likes&limit=5000&query=asdf') 
        # Process the response
           break  # Break out of the loop if the request is successful
       except ConnectTimeout:
        if retry < max_retries - 1:
            print(f"Connection timed out. Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)
        else:
            print("Max retries exceeded. Unable to establish connection.")
 
     if response.status_code == 200:
           dataArray = response.json()
           for item in dataArray: 
                  cardData = item.get('cardData', '')
                  if isinstance(cardData, dict):  # Check if cardData is a dictionary
                      image_url = cardData.get('emoji', '')
                      name = cardData.get('title', '')
                      colorfrom=cardData.get('colorFrom', '')
                      colorto=cardData.get('colorTo', '')
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
                            'url': item.get('subdomain', ''),
                            'likes':item.get('likes', ''),
                            'colorfrom':colorfrom,
                            'colorto':colorto,
                            }     
                    )
                  count=count+1 
     count=1 