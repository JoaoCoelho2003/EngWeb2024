import json

def read_json_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as json_file:
            data = json_file.readlines()
            json_list = [json.loads(line) for line in data]
    except FileNotFoundError:
        print(f"The file '{file_path}' does not exist!")
        return []
    except Exception as e:
        print(f"An error occurred: '{e}'")
        return []
    return json_list

def create_filmes(data):
    filmes = []
    generos = []
    atores = []
    for item in data:
        new_item = {
            "_id": item["_id"]["$oid"],
            "title": item["title"],
            "year": str(item["year"]),
            "genres": item.get("genres", []),
            "cast": item.get("cast", [])
        }
        filmes.append(new_item)
        
        # Adding genres to the separator
        for genre in item.get("genres", []):
            if genre not in generos:
                generos.append(genre)
                
        # Adding cast members to the separator
        for actor in item.get("cast", []):
            if actor not in atores:
                atores.append(actor)
                
    # Creating separators
    generos_separator = [{"id": name} for i, name in enumerate(generos, 1)]
    atores_separator = [{"id": name} for i, name in enumerate(atores, 1)]
    
    return {"filmes": filmes, "generos": generos_separator, "atores": atores_separator}

def main():
    file_path = "filmes.json"
    json_data = read_json_file(file_path)
    if json_data:
        data = create_filmes(json_data)
        with open("filmes_normalized.json", "w", encoding="utf-8") as output_file:
            json.dump(data, output_file, indent=4)

if __name__ == "__main__":
    main()
