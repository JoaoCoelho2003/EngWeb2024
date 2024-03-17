# TPC5: Compositores e os diversos Periodos - Servidor Web Para Gerenciamento Utilizando Express

## Autor

**Nome:** João Coelho

**Número:** A100596

## Introdução

Neste projeto, o principal objectivo foi desenvolver um sistema para gerir informações sobre compositores e os diferentes períodos musicais em que estes se destacaram. 
Utilizou-se um servidor JSON para armazenar e disponibilizar esses dados. As rotas principais, `/compositores` e `/periodos`, permitem aceder a listas de todos os compositores e períodos musicais, respetivamente. 
Além disso, as rotas `/compositores/{id}` e `/periodos/{id}` permitem ver detalhes específicos sobre um compositor ou a lista de compositores relacionados com o período selecionado. Assim, foi criada uma interface web que permitisse aos utilizadores visualizar, adicionar, editar e apagar informações sobre compositores e períodos musicais, facilitando a navegação entre diferentes páginas para aceder a esses recursos e realizar várias operações.
É importante destacar que, ao contrário do trabalho da semana anterior, este projeto utilizou a framework `Express` para definir as rotas do servidor.

## Objetivos

Assim, mais resumidamente, os objetivos do trabalho são:

- `Implementar o Dataset no JSON-Server:` Carregar os dados sobre compositores e períodos musicais num servidor JSON para fornecer acesso aos dados pela aplicação web.

- `Criação de um conjunto de rotas importantes:`
    - `/compositores:` Rota para listar todos os compositores.
    - `/compositores/{id}:` Rota para obter informações detalhadas sobre um compositor específico.
    - `/compositores?periodo={periodo}:` Rota para listar compositores de um período musical específico.
    - `/periodos:` Rota para listar todos os períodos musicais.
    - `/periodos/{id}:` Rota para obter informações detalhadas sobre um período musical específico.

- `Implementar um Serviço com Operações CRUD:` Desenvolver um serviço que ofereça operações CRUD (Create, Read, Update, Delete) para manipulação de dados sobre compositores e períodos musicais.

## Instruções de Uso

Antes de iniciar o servidor, é necessário preparar o arquivo `improved_compositores.json`, que será utilizado como dataset para o servidor JSON. Para isso, execute o seguinte comando:

```
$ python3 improveJson.py
```

Este comando irá executar o script Python `improve_dataset.py`, que melhora a estrutura do dataset original, `compositores.json`, e guarda o resultado com o nome `improved_compositores.json`. Certifique-se de que o ficheiro compositores.json esteja presente na mesma diretoria do script Python antes de executá-lo.

Antes de iniciar o servidor web, certifique-se de executar o seguinte comando para iniciar o servidor JSON que fornece os dados para a aplicação:

```
$ json-server --port 17001 --watch improved_compositores.json
```

Este comando irá iniciar o servidor JSON na porta 17001 e monitorar as alterações no ficheiro `improved_compositores.json`, que contém os dados sobre os compositores e períodos musicais.

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

















