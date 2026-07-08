const pool = require("./database");
const express = require("express");
const app = express();

app.use(express.json());
// Rotas vão aqui entre o JSON e o static da pasta public

app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000! 🚀");
});