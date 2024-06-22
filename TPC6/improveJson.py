import json
import sys

def read_json_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as json_file:
            data = json.load(json_file)
    except FileNotFoundError:
        print(f"The file '{file_path}' does not exist!")
        sys.exit(1)
    except Exception as e:
        print(f"An error occurred: '{e}'")
        sys.exit(1)
    return data

def update_compositores(data):
    compositores_data = [compositor for compositor in data["compositores"]]
    return compositores_data

def update_periodos(data):
    periodos = []
    for compositor in data["compositores"]:
        if "periodo" in compositor:
            periodos.append(compositor["periodo"])

    periodos = list(set(periodos))
    periodos_separator = [{"_id": name} for i, name in enumerate(periodos, 1)]
    periodos_data = periodos_separator
    return periodos_data

def write_json(data, filename):
    with open(filename, "w") as file:
        json.dump(data, file, indent=4)

def main():
    data = read_json_file("datasets/compositores.json")
    
    compositores_data = update_compositores(data)
    periodos_data = update_periodos(data)
    
    write_json(compositores_data, "datasets/compositoresFinal.json")
    write_json(periodos_data, "datasets/periodos.json")

if __name__ == "__main__":
    main()
