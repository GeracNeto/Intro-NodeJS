const { response } = require('express');
const express = require('express');
const {randomUUID} = require("crypto"); // para inserir id aleatórios
const fs = require('fs');

const app = express();

app.use(express.json());

// O array será como o banco de dados

let products = [];

fs.readFile('products.json', "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }
    else{
        products = JSON.parse(data);
    }
});

/*
POST = Inserir um dado
GET = Buscar um/mais dados
PUT = Alterar um dado
DELETE = Remover um dado
*/

/*
Body = Sempre que eu quiser enviar dados para a minha aplicação
Params = Parâmetro de rota /products/234252
Query =  /products?id=235423534&value=45346356
*/

app.post("/products", (request, response) => {
    // Nome e preço = name e price
    
    const {name, price} = request.body; //desestruturação do body

    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product);

    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log('Produto Inserido');
        }
    })

    return response.json(product);
});

app.get('/products', (request, response) => {
    return response.json(products);
});

app.get('/products/:id', (request, response) => {
    const {id} = request.params;
    const product = products.find(product => product.id === id);

    return response.json(product);
});

app.put('/products/:id', (request, response) => {
    const {id} = request.params;
    const {name, price} = request.body;

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    }

    return response.json({message: "Produto alterado com sucesso"});
})

app.delete('/products/:id', (request, response) => {
    const {id} = request.params;

    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    return response.json({message: "Produto removido com sucesso"})
})

app.listen(4002, () => console.log('Servidor está rodando na porta 4002'));