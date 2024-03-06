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

def update_structure(data):
    new_data = {}
    new_data["compositores"] = data["compositores"]
    # the periodos key is not present in the original json file, need to read through the compositores and add the periodos,, without duplicates
    periodos = []
    for compositor in new_data["compositores"]:
        if "periodo" in compositor:
            periodos.append(compositor["periodo"])

    # remove the duplicates
    periodos = list(set(periodos))
    periodos_separator = [{"id": name} for i, name in enumerate(periodos, 1)]
    new_data["periodos"] = periodos_separator
    return new_data


def write_json(data, filename):
    with open(filename, "w") as file:
        json.dump(data, file, indent=4)

def main():
    data = read_json_file("compositores.json")
    data = update_structure(data)
    write_json(data, "improved_compositores.json")

if __name__ == "__main__":
    main()
    
    