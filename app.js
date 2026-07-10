const pool = require("./database");
const express = require("express");
const app = express();

app.use(express.json());
// Rotas vão aqui entre o JSON e o static da pasta public
app.get("/itens", async (req, res) => {
    try {
        const todosItens = await pool.query("SELECT * FROM itens_compra ORDER BY id ASC");
        res.json(todosItens.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erro ao buscar os itens." });
    }
});
app.post("/itens", async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ error: "O nome do item é obrigatório." });
        }
        const novoItem = await pool.query(
            "INSERT INTO itens_compra (nome) VALUES ($1) RETURNING *",
            [nome]
        );
        res.status(201).json(novoItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erro ao salvar o item." });
    }
});

app.put("/itens/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { comprado } = req.body;
        
        const itemAtualizado = await pool.query(
            "UPDATE itens_compra SET comprado = $1 WHERE id = $2 RETURNING *",
            [comprado, id]
        );
        
        if (itemAtualizado.rows.length === 0) {
            return res.status(404).json({ error: "Item não encontrado." });
        }
        
        res.json(itemAtualizado.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erro ao atualizar o item." });
    }
});

app.delete("/itens/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletarItem = await pool.query("DELETE FROM itens_compra WHERE id = $1 RETURNING *", [id]);
        
        if (deletarItem.rows.length === 0) {
            return res.status(404).json({ error: "Item não encontrado." });
        }
        
        res.json({ message: "Item deletado com sucesso!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erro ao deletar o item." });
    }
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000! 🚀");
});