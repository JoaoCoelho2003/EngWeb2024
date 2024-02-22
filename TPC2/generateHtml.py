import sys
import json
import os

# open the json file and read the data

def open_json(file):
    with open(file, 'r') as f:
        data = json.load(f)
    return data

# create the index page with the links to the other pages, the link is the name of the City in the json file

def create_index(data,index_page):
    index = open("index.html", "w")
    index_page += '<h1 class=\"bg-slate-200 py-4 text-3xl font-semibold text-white\" style=\"background-color: #6a0303;text-align: center;\">Cidades</h1>'
    index_page += "<ul>"
    for city in data['cidades']:
        # access the colletions "Cidades" and then "nome"
        index_page += f"<li><a href=\"http://localhost:1902/{city['id']}.html\">{city['nome']}</a></li>"
    index_page += "</ul>"
    index_page += "</body></html>"
    index.write(index_page)

def create_CityPages(data):
    # the page files are created inside a new older called "Pages"
    if not os.path.exists('Pages'):
        os.makedirs('Pages', exist_ok=True)
    for city in data['cidades']:
        # access the colletions "Cidades" and then "nome"
        city_page = f"""
        <!DOCTYPE html>
        <html lang="pt-pt">
        <head>
            <title>{city['nome']}</title>
            <meta charset="UTF-8">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
        """
        city_page += f"<h1 class=\"bg-slate-200 py-4 text-3xl font-semibold text-white\" style=\"background-color: #6a0303;text-align: center;\">{city['nome']}</h1>"
        # população, descrição, e distrito
        city_page += f"<p>População: {city['população']}</p>"
        city_page += f"<p>Descrição: {city['descrição']}</p>"
        city_page += f"<p>Distrito: {city['distrito']}</p>"
        city_page += "<h2 class=\"bh-slate-100 py-12 text-3xl font-semibold\" style=\"color: #6a0303;text-align: center;\">Ligações</h2>"
        city_page += "<ul>"
        cityName = ""

        for ligacao in data['ligacoes']:
            if ligacao['origem'] == city['id']:
                for cities in data['cidades']:
                    if cities['id'] == ligacao['destino']:
                        cityName = cities['nome']
                city_page += f"<li><a href=\"http://localhost:1902/{ligacao['destino']}.html\">{cityName}</a></li>"
                city_page += f"<p>Distância: {ligacao['distância']}</p>"

        city_page += "</ul>"
        city_page += "</body></html>"
        with open(f'Pages/{city["id"]}.html', 'w', encoding='utf-8') as file:
            file.write(city_page)

def main():
    index_page = """
        <!DOCTYPE html>
        <html lang="pt-pt">
        <head>
            <title>City Map</title>
            <meta charset="UTF-8">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
        """
    data = open_json("mapa-virtual.json")
    create_index(data,index_page)
    create_CityPages(data)

if __name__ == "__main__":
    main()
