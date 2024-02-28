// needs to create a main page with 3 links, Filmes, Género, Atores

var http = require('http');
var url = require('url');
var axios = require('axios');
const { Console } = require('console');


http.createServer((req, res) => {
    console.log(req.method + ' ' + req.url);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    var q = url.parse(req.url, true);
    if (q.pathname == '/') {
        res.write("<h2>Escola de Música</h2>");
        res.write("<ul>");
        res.write("<li><a href='/filmes'>Filmes</a></li>");
        res.write("<li><a href='/genero'>Género</a></li>");
        res.write("<li><a href='/atores'>Atores</a></li>");
        res.write("</ul>");
        res.end();
    } else if (q.pathname == '/filmes') {
        axios.get('http://localhost:17001/filmes')
            .then(dados => {
                res.write("<ul>");
                for (i in dados.data) {
                    res.write("<li><a href='" + dados.data[i].id + "'>" + dados.data[i].title + "</a></li>");
                }
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else if (q.pathname == '/genero') {
        axios.get('http://localhost:17001/generos')
            .then(dados => {
                res.write("<ul>");
                for (i in dados.data) {
                    res.write("<li><a href='" + dados.data[i].id + "'>" + dados.data[i].id + "</a></li>");
                }
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else if (q.pathname == '/atores') {
        axios.get('http://localhost:17001/atores')
            .then(dados => {
                res.write("<ul>");
                for (i in dados.data) {
                    res.write("<li><a href='" + dados.data[i].id + "'>" + dados.data[i].id + "</a></li>");
                }
                res.end();
            })
            .catch(err => {
                console.log('Erro: ' + err);
                res.end();
            });
    } else {
        res.write("<p>Pedido não suportado: " + q.pathname + "</p>");
        res.end();
    }

}).listen(1902);

console.log('Servidor à escuta na porta 1902...');