import requests
from django.http import HttpResponse
from django.http import JsonResponse
from replicate.models import ReplicateData
from requests.exceptions import ConnectTimeout
import time
import gradio as gr


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")



def build_interface(data):
    inputs =[]
    schema =data.get("latest_version", {}).get("openapi_schema", {}).get("components", {}).get("schemas", {})
    ordered_properties = sorted(schema.get("Input", {}).get("properties", {}).items(), key=lambda x: x[1].get("x-order", 0))
    for property_name, property_info in ordered_properties :
        if "x-order" in property_info:
            order = int(property_info.get('x-order',''))
            if property_info.get("type", {}) == "integer":
               value= data.get('default_example', '').get('input','').get(property_name,'')
               if "minimum" and "maximum" in property_info:
                    inputs.insert(order, gr.Slider(label=property_name, info=property_info.get('description',''), value=property_info.get('default', value), minimum=property_info.get('minimum', ''), maximum=property_info.get('maximum', ''), step=1))
               else:
                    inputs.insert(order, gr.Number(label=property_name, info=property_info.get('description',''), value=property_info.get('default', value)))
                  
            elif property_info.get("type", {}) == "string":
                value= data.get('default_example', '').get('input','').get(property_name,'')
                if  property_info.get('format','') == 'uri':
                    if 'image' in property_info.get('title', '').lower():
                        if value :
                             inputs.insert(order, gr.Image(label=property_info.get('title', ''), value=property_info.get('default', value)))
                        else :
                             inputs.insert(order, gr.Image(label=property_info.get('title', '')))
                    # elif property_info.get('title','') == 'Image Path':
                    #     inputs.insert(order, gr.Image(label=property_info.get('title', ''), value=property_info.get('default', value)))
                    else:
                        inputs.insert(order, gr.File(label=property_info.get('title', '')))
                else:
                    inputs.insert(order, gr.Textbox(label=property_info.get('title', ''), info=property_info.get('description', ''), value=property_info.get('default', value)))

            elif property_info.get("type", {}) == "number":
                value= data.get('default_example', '').get('input','').get(property_name,'')
                if "minimum" and "maximum" in property_info:
                    inputs.insert(order, gr.Slider(label=property_info.get('title', ''), info=property_info.get('description', ''), value=property_info.get('default', value), minimum=property_info.get('minimum', ''), maximum=property_info.get('maximum', '')))
                else:
                    inputs.insert(order, gr.Number(label=property_info.get('title', ''), info=property_info.get('description', ''), value=property_info.get('default', value)))
            elif property_info.get("type", {}) == "boolean":
                value= data.get('default_example', '').get('input','').get(property_name,'')
                inputs.insert(order, gr.Checkbox(label=property_info.get('title', ''), info=property_info.get('description', ''), value=value))

            else:
                value= data.get('default_example', '').get('input','').get(property_name,'')
                options=schema.get(property_name,'').get('enum',[])
                inputs.insert(order, gr.Dropdown(label=property_info.get('title', ''),  info=property_info.get('description', ''),choices=options, value=property_info.get("default", value)))

    outputs = []
    chain =''
    if schema.get("Output",{}).get("type",'') == "array":
        for item in data.get("default_example",'').get("output",[]):
            if schema.get("Output",{}).get("items", '').get("type",'') == "string":
                if  schema.get("Output",{}).get("items", '').get("format",'') == "uri":
                    outputs.append(gr.Image(value=item))
                else:
                    if schema.get("Output",{}).get('x-cog-array-display','') == "concatenate":
                        chain = chain + item
                        outputs=gr.Textbox(value=chain)
                    else:
                        outputs.append(gr.Textbox(value=item))
    elif schema.get("Output",{}).get("type",'') == "object":
         if schema.get("Output",{}).get("properties",'') == "media_path":
           outputs= gr.File()
            # value= data.get("default_example",'').get("output", '').get("media_path",'')
         properties = schema.get("Output", {}).get("properties", {})
         if isinstance(properties, dict):
           for key, item in properties.items():
                if item.get('type', '') == 'string':
                    if item.get('format', '') == 'uri':
                        outputs.append(gr.Image())

    else:
          if schema.get("Output",{}).get("type",'') == "string":
                if  schema.get("Output",{}).get("format",'') == "uri":
                    path=(data.get("default_example",'').get("output",''))
                    if '.png' in path:
                        outputs=(gr.Image(value=path))
                    else:
                         outputs=(gr.Image())
                else:
                    outputs=(gr.Textbox(value=data.get("default_example",'').get("output",'')))

    title=data.get('owner','')+'/'+data.get('name','')
    interface = gr.Interface(None,inputs,outputs,title=title, description=data.get('description',''))  # Outputs can be added if needed
    return interface

def get_data(request):
    owner = request.GET.get('owner')
    name = request.GET.get('name')
    print (owner)
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
    interface_url=interface.launch(share = True)

    return interface
    # return JsonResponse({'interface_url': interface_url})
    
