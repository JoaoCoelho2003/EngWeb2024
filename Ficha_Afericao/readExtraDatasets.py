import json

def create_modalidades(datasets):
    modalidades = {}

    for dataset in datasets:
        with open(dataset, 'r') as file:
            data = json.load(file)
            pessoas = data.get('pessoas', [])
            
            for pessoa in pessoas:
                desportos = pessoa.get('desportos', [])
                cod = pessoa.get('BI')

                if cod is None:
                    cod = pessoa.get('CC')

                for desporto in desportos:
                    if desporto not in modalidades:
                        modalidades[desporto] = []

                    modalidades[desporto].append(cod)

    modalidades_dict = [{"nome": nome, "pessoas": pessoas} for nome, pessoas in modalidades.items()]

    with open('./datasets/modalidades.json', 'w') as file:
        json.dump(modalidades_dict, file, indent=4)

def main():
    datasets = ['./datasets/dataset-extra1.json', './datasets/dataset-extra2.json', './datasets/dataset-extra3.json']
    create_modalidades(datasets)

if __name__ == '__main__':
    main()
