import os
import xml.etree.ElementTree as ET

index_page = """
<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <title>Road Map</title>
    <meta charset="UTF-8">
    <style>
        body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
    }

    .container {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }

    h1 {
        color: #333;
        text-align: center;
        font-size: 36px;
        margin-bottom: 20px;
    }

    .links-container {
        text-align: center;
    }

    .links-container a {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        font-size: 18px;
        transition: background-color 0.3s ease;
    }

    .links-container a:hover {
        background-color: #0056b3;
    }
    </style>
</head>
<body>
"""

# add a title to the index page
index_page += "<h1>Road Map</h1>"

xml_folder = 'MapaRuas-materialBase/texto'

script_dir = os.path.dirname(os.path.realpath(__file__))
images_folder = os.path.join(script_dir,'MapaRuas-materialBase','imagem')

index_page += "<ul>"

if not os.path.exists('html'):
    os.makedirs('html', exist_ok=True)
    
for file in os.listdir(xml_folder):
    if file.endswith('.xml'):
        tree = ET.parse(os.path.join(xml_folder, file))
        root = tree.getroot()

        roadName = root.find('meta/nome').text
        index_page += f"<li><a href='html/{roadName}.html'>{roadName}</a></li>"

index_page += "</ul>"
index_page += "</body></html>"

with open('index.html', 'w', encoding='utf-8') as file:
    file.write(index_page)

for filename in os.listdir(xml_folder):
    if filename.endswith('.xml'):
        tree = ET.parse(os.path.join(xml_folder, filename))
        root = tree.getroot()

        roadName = root.find('meta/nome').text

        road_page = f"""
            <!DOCTYPE html>
            <html lang="pt-pt">
            <head>
                <title>{roadName}</title>
                <meta charset="UTF-8">
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 0;
                        background-color: #f5f5f5;
                    }}

                    h1 {{
                        color: #333;
                        text-align: center;
                    }}

                    h2 {{
                        color: #666;
                    }}

                    ul {{
                        list-style-type: none;
                        padding: 0;
                    }}

                    li {{
                        margin-bottom: 10px;
                        padding: 10px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }}

                    img {{
                        max-width: 100%;
                        height: auto;
                        display: block;
                        margin: 10px auto;
                    }}

                    a {{
                        color: #007bff;
                        text-decoration: none;
                    }}

                    a:hover {{
                        text-decoration: underline;
                    }}

                    h6 {{
                        text-align: center;
                        margin-top: 20px;
                    }}
                </style>
            </head>
            <body>
            """

        
        road_page += f"<h1>{roadName}</h1>"

        for picture in root.findall('corpo/figura'):
            imagePath = picture.find('imagem').attrib.get('path','')
            image = os.path.abspath(os.path.join(images_folder, imagePath))
            caption = picture.find('legenda').text
            road_page += f"<div style='text-align: center;'>"
            road_page += f"<div style='display: inline-block; position: relative;'>"
            road_page += f"<img src='{image}' alt='{caption}' style='display: block;'>"
            road_page += f"<p style='position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);'>{caption}</p>"
            road_page += f"</div>"
            road_page += f"</div>"
            

        for para in root.findall('corpo/para'):
            para_text = ''.join(para.itertext())
            road_page += f"<p>{para_text}</p>"
            




        road_page += "<h2>Lista de Casas</h2>"
        road_page += "<ul>"

        for casa in root.findall('corpo/lista-casas/casa'):
            road_page += "<li>"
            road_page += f"Número: {casa.findtext('número', default='') }<br>"
            road_page += f"Enfiteuta: {casa.findtext('enfiteuta', default='')}<br>"
            road_page += f"Foro: {casa.findtext('foro', default='')}<br>"
            
            for para in casa.findall('desc/para'):
                para_text = ''.join(para.itertext())
                road_page += f"Descrição: {para_text}<br>"

        road_page += "</ul>"
        road_page += "<h6> <a href='../index.html'>Voltar</a></h6>"
        road_page += "</body></html>"

        with open(os.path.join('html', f"{roadName}.html"), 'w', encoding='utf-8') as file:
            file.write(road_page)
        


