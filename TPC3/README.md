# TPC3: Listagem de Filmes, Géneros e Atores

## Autor

**Nome:** João Coelho

**Número:** A100596

# Enunciado

Este projeto consiste na criação de um servidor Node.js que fornece uma página web com uma lista de filmes, géneros e atores, cada um com seus respectivos links. O servidor utiliza o JSON Server para fornecer os dados necessários.

O projeto tem como objetivo:

- Desenvolver uma página web de índice que liste todos os filmes, géneros e atores, com links para páginas individuais de cada um;
- Criar páginas individuais para cada filme, género e ator, fornecendo detalhes relevantes como título, ano, elenco, entre outros;
- As páginas dos atores devem fornecer uma lista de todos os filmes em que os mesmos participaram e, por sua vez, as páginas dos géneros devem listar todos os filmes que entram na categoria selecionada.

## Instruções de Uso

Para executar este projeto é necessário seguir os seguintes passos:

1. `Instalação de dependências:` Antes de iniciar, é necessário instalar as dependências do projeto. Certifique-se que tem o Node.js e o npm instalados em seu sistema.

2. `Compilação do ficheiro Python:` Execute o script `normalize.py` para normalizar o ficheiro `filmes.json`, criando assim o dataset normalizado `filmes_normalized.json`:

3. `Inicialização do servidor JSON:` Utilize o comando `json-server --port 17001 --watch filmes_normalized.json` para iniciar o servidor JSON na porta 17001, observando o ficheiro `filmes_normalized.json`.

4. `Inicialização do servidor Node.js:` Execute o servidor Node.js utilizando o comando `node server.js`. Este servidor fornecerá as rotas e endpoints necessários para o funcionamento do projeto.

5. `Acesso à página Web:` Após iniciar os servidores JSON e Node.js, abra o navegador e acesse a página web através do endereço `http://localhost:1902/`.