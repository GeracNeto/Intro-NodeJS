const http = require("http") // importando método HTTP

//Criando servidor
// req: tudo que está sendo recebido pela requisição
// res: resposta que é retornada para quem fez a requisição
// .listen indica a porta para rodar o servidor

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'}) //200 indica o status da requisção

    if(request.url === '/produto'){
        response.end(JSON.stringify({
            message: "Rota de produto",
        }))
    }

    if(request.url === '/usuarios'){
        response.end(JSON.stringify({
            message: "Rota de usuarios",
        }))
    }
    
    //.end retorna com a resposta, no caso retornando um JSON com a message
    response.end(JSON.stringify({
        message: "Minha primeira aplicação com NodeJS",
    }));

}).listen(3000, () => console.log("Servidor rodando na porta 3000"))
