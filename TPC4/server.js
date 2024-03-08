var http = require('http');
var axios = require('axios');
var static = require('./static.js')
var templates = require('./templates.js')
const { parse } = require('querystring');

function recuperaInfo(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function getCompositoresByPeriodo(periodo){
    return axios.get("http://localhost:17001/compositores?periodo=" + periodo)
    .then(resp =>{
        return resp.data
    })
    .catch(erro =>{
        throw erro
    })
}

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    } else{
        switch(req.method){
            case "GET":
                if(req.url == "/"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.mainPage(d))
                    res.end()
                }
                else if(req.url == "/compositores"){
                    axios.get("http://localhost:17001/compositores")
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositoresListPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de compositores</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(req.url == "/periodos"){
                    axios.get("http://localhost:17001/periodos")
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodosListPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(req.url == "/periodos/registo"){
                    console.log("entrou")
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.periodoFormPage(d))
                    res.end()
                }
                else if(req.url == "/compositores/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.compositorFormPage(d))
                    res.end()
                }
                else if(/\/periodos\/[A-Za-z]+$/i.test(req.url)){
                    var periodo = req.url.split("/")[2]
                    getCompositoresByPeriodo(periodo)
                    .then(compositores =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodoPage(periodo, compositores,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o periodo " + periodo + "</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/periodos\/edit\/[A-Za-z]+$/i.test(req.url)){
                    var periodo = req.url.split("/")[3]
                    axios.get("http://localhost:17001/periodos/" + periodo)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodoFormEditPage(resp.data,d))
                        res.end()
                    }
                    )
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o periodo " + periodo + "</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/periodos\/delete\/[A-Za-z]+$/i.test(req.url)){
                    var periodo = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/periodos/" + periodo)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.periodosListPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/compositores\/C[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[2]
                    axios.get("http://localhost:17001/compositores/" + id)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositorPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor " + id + "</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.get("http://localhost:17001/compositores/" + id)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositorFormEditPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter o compositor " + id + "</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/compositores\/delete\/C[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/compositores/" + id)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.compositoresListPage(resp.data,d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de compositores</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                }
                break;
            case "POST":
                if(req.url == "/compositores"){
                    recuperaInfo(req, resultado =>{
                        axios.post("http://localhost:17001/compositores", resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.compositoresListPage(resp.data,d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }
                else if(req.url == "/periodos"){
                    recuperaInfo(req, resultado =>{
                        axios.post("http://localhost:17001/periodos", resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.periodosListPage(resp.data,d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de periodos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }
                else if(/\/periodos\/edit\/[A-Za-z]+$/i.test(req.url)){
                    recuperaInfo(req, resultado =>{
                        var periodo = req.url.split("/")[3]
                        axios.put("http://localhost:17001/periodos/" + periodo, resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.editConfirmPage(d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de periodos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }
                else if(/\/periodos\/delete\/[A-Za-z]+$/i.test(req.url)){
                    var periodo = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/periodos/" + periodo)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.deleteConfirmPage(d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de periodos</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(/\/compositores\/edit\/C[0-9]+$/i.test(req.url)){
                    recuperaInfo(req, resultado =>{
                        var id = req.url.split("/")[3]
                        axios.put("http://localhost:17001/compositores/" + id, resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.editConfirmPage(d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }
                else if(/\/compositores\/delete\/C[0-9]+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                    axios.delete("http://localhost:17001/compositores/" + id)
                    .then(resp =>{
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write(templates.deleteConfirmPage(d))
                        res.end()
                    })
                    .catch(erro =>{
                        res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de compositores</p>")
                        res.write("<p>" + erro + "</p>")
                        res.end()
                    })
                }
                else if(req.url == "/compositores/registo"){
                    recuperaInfo(req, resultado =>{
                        axios.post("http://localhost:17001/compositores", resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.registoConfirmPage(d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de compositores</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }
                else if(req.url == "/periodos/registo"){
                    recuperaInfo(req, resultado =>{
                        axios.post("http://localhost:17001/periodos", resultado)
                        .then(resp =>{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.registoConfirmPage(d))
                            res.end()
                        })
                        .catch(erro =>{
                            res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de periodos</p>")
                            res.write("<p>" + erro + "</p>")
                            res.end()
                        })
                    })
                }
                else{
                    res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                    res.end()
                }
                break;
            default:
                res.writeHead(501, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
                res.end()
                break;
        }
    }
}).listen(8080);

console.log('Servidor à escuta na porta 8080...');