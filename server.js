const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Projetos falsos para teste
// --------------------------------------------------------------------------------------------------------------------
let portfolioData = {
    projetos: [
        {
            id: 1,
            nome: "Planeja SJC (API)",
            descricao: "Projeto Desenvolvido pelo grupo OmniDevs com o intuito de criar um site com informações do censo de 2022.",
            link: "https://github.com/OmniDevsOficial/API-Censo-2022"
        },
        {
            id: 2,
            nome: "Akaer (API)",
            descricao: "Projeto Desenvolvido pelo grupo OmniDevs para organizar e visualizar as normas usadas pela Akaer.",
            link: "https://github.com/OmniDevsOficial/API-Akaer"
        }
    ]
};
// --------------------------------------------------------------------------------------------------------------------

app.get('/api/projetos', (req, res) => {
    res.status(200).json(portfolioData.projetos);
});

app.post('/api/projetos', (req, res) => {
    const novoProjeto = {
        id: Date.now(),
        nome: req.body.nome,
        descricao: req.body.descricao,
        link: req.body.link
    };
    
    portfolioData.projetos.push(novoProjeto);
    res.status(201).json({ mensagem: "Projeto criado com sucesso!", projeto: novoProjeto });
});

app.put('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = portfolioData.projetos.findIndex(p => p.id === id);

    if (index !== -1) {
        portfolioData.projetos[index] = {
            id: id,
            nome: req.body.nome || portfolioData.projetos[index].nome,
            descricao: req.body.descricao || portfolioData.projetos[index].descricao,
            link: req.body.link || portfolioData.projetos[index].link
        };
        res.status(200).json({ mensagem: "Projeto atualizado com sucesso!", projeto: portfolioData.projetos[index] });
    } else {
        res.status(404).json({ erro: "Projeto não encontrado." });
    }
});

app.delete('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = portfolioData.projetos.findIndex(p => p.id === id);

    if (index !== -1) {
        const excluido = portfolioData.projetos.splice(index, 1);
        res.status(200).json({ mensagem: "Projeto deletado com sucesso!", projeto: excluido });
    } else {
        res.status(404).json({ erro: "Projeto não encontrado." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Testes as rotas da API em http://localhost:${PORT}/api/projetos`);
});
