import os
import xml.etree.ElementTree as ET


index_page = """
<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <title>Road Map</title>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
"""

# add a title to the index page
index_page += "<h1 class=\"bg-slate-200 py-4 text-3xl font-semibold text-white\" style=\"background-color: #6a0303;\">Road Map</h1>"
xml_folder = 'MapaRuas-materialBase/texto'

script_dir = os.path.dirname(os.path.realpath(__file__))
images_folder = os.path.join(script_dir,'MapaRuas-materialBase','imagem')

index_page += "<ul>"

if not os.path.exists('html'):
    os.makedirs('html', exist_ok=True)

xml_files = sorted([file for file in os.listdir(xml_folder) if file.endswith('.xml')])

sorted_files = []

for file in xml_files:
    if file.endswith('.xml'):
        tree = ET.parse(os.path.join(xml_folder, file))
        root = tree.getroot()

        roadName = root.find('meta/nome').text
        sorted_files.append((roadName, file))

sorted_files = sorted(sorted_files, key=lambda x: x[0])

for roadName, file in sorted_files:
    index_page += f"<li><a href='html/{roadName}.html'>{roadName}</a></li>"

index_page += "</ul>"
index_page += "<div style='background-color: #6a0303; height: 100px;'></div>"
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
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
        """

        
        road_page += f"<h1 class=\"bg-slate-200 py-4 text-3xl font-semibold text-white\" style=\"background-color: #6a0303; text-align: center;\">{roadName}</h1>"

        for picture in root.findall('corpo/figura'):
            imagePath = picture.find('imagem').attrib.get('path','')
            image = os.path.abspath(os.path.join(images_folder, imagePath))
            caption = picture.find('legenda').text
            road_page += f"<div style='text-align: center;'>"
            road_page += f"<div style='display: inline-block; position: relative;'>"
            road_page += f"<img src='{image}' alt='{caption}' style='display: block;'>"
            road_page += f"<p style='position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); margin-top: 40px;'>{caption}</p>"
            road_page += f"</div>"
            road_page += f"</div>"
            road_page += f"<div style='margin-bottom: 60px;'></div>"


        

        road_page += "<h2 class=\"pt-16 pb-6 text-3xl font-semibold\" style=\"color: #6a0303; text-align: center;\">Informação da Rua</h2>"

        road_page += "<div style=\"background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); margin: 20px auto; max-width: 1500px; border: 2px solid #6a0303;\">"
        for para in root.findall('corpo/para'):
            para_text = ''.join(para.itertext())
            road_page += f"<p class=\"py-1\">{para_text}</p>"
        road_page += "</div>"

        road_page += "<h2 class=\"bh-slate-100 py-12 text-3xl font-semibold\" style=\"color: #6a0303;text-align: center;\">Informações das Casas</h2>"
        road_page += "<ul>"


        road_page += "<div class=\"grid grid-cols-3 gap-4 mx-16 justify-items-stretch\">"
        for casa in root.findall('corpo/lista-casas/casa'):
            road_page += "<li>"
            road_page += "<div>"
            road_page += f"<h3 class =\"pb-4 text-3xl font-semibold\" style=\"color: #6a0303; text-align: center;\">Casa {casa.findtext('número', default='')}</h3>"
            road_page += "<div style=\"background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); max-height: 200px; overflow-y: auto; margin: 20px auto; max-width: 500px; border: 2px solid #6a0303;\">"
            
            road_page += f"<span style=\"color: #6a0303; font-weight: bold; margin-bottom: 10px; display: block;\">Enfiteuta:</span> {casa.findtext('enfiteuta', default='').strip()}"
            
            road_page += f"<span style=\"color: #6a0303; font-weight: bold; margin-bottom: 10px; display: block;\">Foro:</span> {casa.findtext('foro', default='').strip()}"
            
            for para in casa.findall('desc/para'):
                para_text = ''.join(para.itertext())
                road_page += f"<span style=\"color: #6a0303; font-weight: bold; margin-bottom: 10px; display: block;\">Descrição:</span> {para_text.strip()}"
            road_page += "</div>"
            road_page += "</div>"
        road_page += "</div>"




        road_page += "</ul>"
        road_page += "<div style='text-align: center; margin-top: 20px; margin-bottom: 20px;'>"
        road_page += "<h6><a href='../index.html' style='display: inline-block; padding: 10px 20px; background-color: #6a0303; color: white; text-decoration: none; border-radius: 5px;'>Voltar</a></h6>"
        road_page += "</div>"
        road_page += "<div style='background-color: #6a0303; height: 100px;'></div>"
        road_page += "</body></html>"

        with open(os.path.join('html', f"{roadName}.html"), 'w', encoding='utf-8') as file:
            file.write(road_page)
        


