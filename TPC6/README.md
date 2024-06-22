# TPC5: Compositores e os diversos Periodos - Servidor Web Para Gerenciamento Utilizando Express

## Autor

**Nome:** João Coelho

**Número:** A100596

## Introdução

Neste projeto, o principal objetivo foi desenvolver um sistema para gerir informações sobre compositores e os diferentes períodos musicais em que estes se destacaram, utilizando o framework Express para definir as rotas do servidor. Este trabalho é quase idêntico ao desenvolvido na semana anterior, com a exceção de que, nesta semana, utilizamos o MongoDB em vez do JSON Server para armazenar e disponibilizar os dados.

## Objetivos

Assim, mais resumidamente, os objetivos do trabalho são:

- `Criação da Base de Dados no MongoDB:` Configuração inicial da base de dados no MongoDB para armazenar informações sobre compositores e períodos musicais.

- `Criação de um conjunto de rotas importantes:`
    - `/compositores:` Rota para listar todos os compositores.
    - `/compositores/{id}:` Rota para obter informações detalhadas sobre um compositor específico.
    - `/compositores?periodo={periodo}:` Rota para listar compositores de um período musical específico.
    - `/periodos:` Rota para listar todos os períodos musicais.
    - `/periodos/{id}:` Rota para obter informações detalhadas sobre um período musical específico.

- `Implementar um Serviço com Operações CRUD:` Desenvolver um serviço que ofereça operações CRUD (Create, Read, Update, Delete) para manipulação de dados sobre compositores e períodos musicais.

## Instruções de Uso

Antes de iniciar o servidor, é necessário preparar os datasets, já que o dataset original não se encontrava no formato JSON Array e não separava os períodos musicais dos compositores. Para isso, foi desenvolvido um script Python que, ao ser executado, cria dois ficheiros JSON em formato JSON Array, um para os compositores e outro para os períodos musicais. Para executar o script Python, utilize o seguinte comando:

```
$ python3 improveJson.py
```

Assim sendo, com os dois datasets prontos, podemos continuar com a configuração do trabalho. Assim sendo, depois ainda é necessário recorrer a um outro script Python para criar um docker compose que irá criar a base de dados no MongoDB e importar os datasets para a mesma. Para executar o script Python, utiliza-se o seguinte comando:

```
$ python3 createDocker.py tpc6EngWeb tp6EngWeb compositores TPC6/datasets/compositoresFinal.json periodos TPC6/datasets/periodos.json 
```

Se tudo correr bem, será criado um ficheiro `docker-compose.yml` que, ao ser executado, irá tratar de toda a configuração da base de dados no MongoDB. Para executar o docker compose, utilize o seguinte comando:



```
$ (sudo) docker-compose up -d
```

Por fim, para iniciar o projeto, certifique-se de instalar todas as dependências necessárias. Na diretoria do projeto, execute o seguinte comando:

```
$ npm i
```

Este comando irá instalar todas as dependências necessárias para o projeto.

Após instalar as dependências, pode iniciar o servidor Node.js executando o seguinte comando:

```
$ npm start
```

Assim, o servidor Node.js irá ser iniciado na porta `1503`.
Para desfrutar do site criado, basta dirigir-se ao seu navegador web e colocar o seguinte endereço na barra de pesquisa:

```
$ http://localhost:1503
```


## Páginas do Site

O aspeto do site permanece exatamente o mesmo que foi desenvolvido no TPC4 da semana anterior. Para referência e detalhes sobre as páginas, consulte o [TPC4](https://github.com/JoaoCoelho2003/EngWeb2024/tree/main/TPC4).

















