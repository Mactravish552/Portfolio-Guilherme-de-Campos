const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ========== Dados de teste para o portfólio ==========

let portfolioData = {
    curriculo: {
        descricao: "Desenvolvedor de Software em formação, com experiência prática em manutenção de hardware e edição de conteúdo digital. Atualmente cursando Desenvolvimento de Software Multiplataforma (DSM) na FATEC. Possui habilidades em linguagens de programação como Python, HTML, CSS e Java Script além de conhecimentos em banco de dados MySQL. Busco oportunidades para aplicar meus conhecimentos técnicos e continuar meu desenvolvimento profissional.",
        curricuoPDF: "PDFs/Curriculo_Luis_Guilherme.pdf"
    },

    formacao: [
        {
            id: 1,
            instituicao: "FATEC",
            curso: "Desenvolvimento de Software Multiplataforma (DSM)",
            status: "Cursando",
            inicio: "2º semestre de 2025",
            termino: "2º semestre de 2028",
            descricao: "Disciplinas iniciais com foco em Python, MySQL, HTML, JavaScript, Lógica de Programação, Banco de Dados"
        },
        {
            id: 2,
            instituicao: "SAGA",
            curso: "Design Digital",
            status: "Concluído",
            ano: "2018",
            descricao: "Conhecimentos em Adobe Photoshop, Illustrator, After Effects, UI/UX Design"
        },
        {
            id: 3,
            instituicao: "ECOMPO",
            curso: "Técnico em Informática",
            status: "Concluído",
            ano: "2014",
            descricao: "Formação em hardware, manutenção de computadores, redes, sistemas operacionais"
        }
    ],

    experiencia: [
        {
            id: 1,
            empresa: "IPMS",
            cargo: "Estagiário TI",
            periodo: "Dez/2025 - Atual",
            atribuicoes: [
                "Atendimento ao usuário e suporte técnico",
                "Apoio na manutenção de equipamentos de TI",
                "Manutenção e gerenciamento de rede e sistemas de segurança"
            ]
        },
        {
            id: 2,
            empresa: "IPMS - Grupo Máximos",
            cargo: "Controlador de Acesso",
            periodo: "Out/2024 - Dez/2025",
            atribuicoes: [
                "Monitoramento e controle de acesso físico e digital",
                "Apoio em sistemas internos e suporte técnico básico"
            ]
        },
        {
            id: 3,
            empresa: "Card na Manga",
            cargo: "Editor de Conteúdo (Canal Digital)",
            periodo: "2017 - 2018",
            atribuicoes: [
                "Produção e edição de vídeos e materiais digitais",
                "Gestão de conteúdo para redes sociais e plataformas online",
                "Uso de ferramentas de edição e design"
            ]
        },
        {
            id: 4,
            empresa: "Notedesk",
            cargo: "Técnico em Manutenção de Notebooks",
            periodo: "2015",
            atribuicoes: [
                "Diagnóstico e reparo de notebooks e desktops",
                "Instalação e configuração de sistemas operacionais",
                "Suporte ao usuário final"
            ]
        }
    ],

    habilidades: {
        competenciasTecnicas: [
            "Linguagens e Desenvolvimento: Python, HTML, CSS, MySQL, JavaScript, TypeScript",
            "Banco de Dados: Modelagem, consultas SQL",
            "Sistemas Operacionais: Windows, Linux",
            "Manutenção de Hardware: Notebooks, desktops, redes locais",
            "Ferramentas de Design e Edição: Photoshop, Illustrator, After Effects"
        ],
        idiomas: [
            { idioma: "Português", nivel: "Nativo" },
            { idioma: "Inglês", nivel: "Avançado (leitura, escrita e conversação)" }
        ]
    },

    documentos: [
        {
            id: 1,
            titulo: "Trabalho Exemplo",
            arquivo: "PDFs/trabalho-exemplo.pdf"
        }
    ],

    certificados: [
        {
            id: 1,
            titulo: "Inova 2025 2.º semestre",
            arquivo: "PDFs/CERTIFICADO-inova-2025-2.pdf"
        },
        {
            id: 2,
            titulo: "Introdução a Cybersegurança",
            arquivo: "PDFs/Introduction_to_Cybersecurity_certificate_Guilherme_de_Campos.pdf"
        },
        {
            id: 3,
            titulo: "certificado Ataques à Sistemas de IA",
            arquivo: "PDFs/certificado Ataques à Sistemas de IA.pdf"
        }
    ],

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
// =========================================================================

// ========== PROJETOS ==========
app.get('/projetos', (req, res) => {
    res.status(200).json(portfolioData.projetos);
});

app.post('/projetos', (req, res) => {
    const novoProjeto = {
        id: Date.now(),
        nome: req.body.nome,
        descricao: req.body.descricao,
        link: req.body.link
    };
    
    portfolioData.projetos.push(novoProjeto);
    res.status(201).json({ mensagem: "Projeto criado com sucesso!", projeto: novoProjeto });
});

app.put('/projetos/:id', (req, res) => {
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

app.delete('/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = portfolioData.projetos.findIndex(p => p.id === id);

    if (index !== -1) {
        const excluido = portfolioData.projetos.splice(index, 1);
        res.status(200).json({ mensagem: "Projeto deletado com sucesso!", projeto: excluido });
    } else {
        res.status(404).json({ erro: "Projeto não encontrado." });
    }
});

// ========== CURRÍCULO ==========
app.get('/curriculo', (req, res) => {
    res.status(200).json(portfolioData.curriculo);
});

app.post('/curriculo', (req, res) => {
    portfolioData.curriculo = {
        descricao: req.body.descricao || portfolioData.curriculo.descricao,
        curricuoPDF: req.body.curricuoPDF || portfolioData.curriculo.curricuoPDF
    };
    res.status(201).json({ mensagem: "Currículo atualizado com sucesso!", curriculo: portfolioData.curriculo });
});

app.put('/curriculo/:id', (req, res) => {
    portfolioData.curriculo = {
        descricao: req.body.descricao || portfolioData.curriculo.descricao,
        curricuoPDF: req.body.curricuoPDF || portfolioData.curriculo.curricuoPDF
    };
    res.status(200).json({ mensagem: "Currículo atualizado com sucesso!", curriculo: portfolioData.curriculo });
});

app.delete('/curriculo', (req, res) => {
    const curriculoAnterior = portfolioData.curriculo;
    portfolioData.curriculo = {
        descricao: "",
        curricuoPDF: ""
    };
    res.status(200).json({ mensagem: "Currículo deletado com sucesso!", curriculo: curriculoAnterior });
});

// ========== FORMAÇÃO ==========
app.get('/formacao', (req, res) => {
    res.status(200).json(portfolioData.formacao);
});

app.get('/formacao/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const formacao = portfolioData.formacao.find(f => f.id === id);
    
    if (formacao) {
        res.status(200).json(formacao);
    } else {
        res.status(404).json({ erro: "Formação não encontrada." });
    }
});

app.post('/formacao', (req, res) => {
    const novaFormacao = {
        id: portfolioData.formacao.length > 0 ? Math.max(...portfolioData.formacao.map(f => f.id)) + 1 : 1,
        instituicao: req.body.instituicao,
        curso: req.body.curso,
        status: req.body.status,
        descricao: req.body.descricao
    };
    
    portfolioData.formacao.push(novaFormacao);
    res.status(201).json({ mensagem: "Formação adicionada com sucesso!", formacao: novaFormacao });
});

app.put('/formacao/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const formacao = portfolioData.formacao.find(f => f.id === id);
    
    if (formacao) {
        formacao.instituicao = req.body.instituicao || formacao.instituicao;
        formacao.curso = req.body.curso || formacao.curso;
        formacao.status = req.body.status || formacao.status;
        formacao.descricao = req.body.descricao || formacao.descricao;
        
        res.status(200).json({ mensagem: "Formação atualizada com sucesso!", formacao });
    } else {
        res.status(404).json({ erro: "Formação não encontrada." });
    }
});

app.delete('/formacao/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = portfolioData.formacao.findIndex(f => f.id === id);
    
    if (index !== -1) {
        const excluido = portfolioData.formacao.splice(index, 1);
        res.status(200).json({ mensagem: "Formação deletada com sucesso!", formacao: excluido });
    } else {
        res.status(404).json({ erro: "Formação não encontrada." });
    }
});

// ========== EXPERIÊNCIA ==========
app.get('/experiencia', (req, res) => {
    res.status(200).json(portfolioData.experiencia);
});

app.get('/experiencia/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const experiencia = portfolioData.experiencia.find(e => e.id === id);
    
    if (experiencia) {
        res.status(200).json(experiencia);
    } else {
        res.status(404).json({ erro: "Experiência não encontrada." });
    }
});

app.post('/experiencia', (req, res) => {
    const novaExperiencia = {
        id: portfolioData.experiencia.length > 0 ? Math.max(...portfolioData.experiencia.map(e => e.id)) + 1 : 1,
        empresa: req.body.empresa,
        cargo: req.body.cargo,
        periodo: req.body.periodo,
        atribuicoes: req.body.atribuicoes || []
    };
    
    portfolioData.experiencia.push(novaExperiencia);
    res.status(201).json({ mensagem: "Experiência adicionada com sucesso!", experiencia: novaExperiencia });
});

app.put('/experiencia/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const experiencia = portfolioData.experiencia.find(e => e.id === id);
    
    if (experiencia) {
        experiencia.empresa = req.body.empresa || experiencia.empresa;
        experiencia.cargo = req.body.cargo || experiencia.cargo;
        experiencia.periodo = req.body.periodo || experiencia.periodo;
        experiencia.atribuicoes = req.body.atribuicoes || experiencia.atribuicoes;
        
        res.status(200).json({ mensagem: "Experiência atualizada com sucesso!", experiencia });
    } else {
        res.status(404).json({ erro: "Experiência não encontrada." });
    }
});

app.delete('/experiencia/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = portfolioData.experiencia.findIndex(e => e.id === id);
    
    if (index !== -1) {
        const excluido = portfolioData.experiencia.splice(index, 1);
        res.status(200).json({ mensagem: "Experiência deletada com sucesso!", experiencia: excluido });
    } else {
        res.status(404).json({ erro: "Experiência não encontrada." });
    }
});

// ========== HABILIDADES ==========
app.get('/habilidades', (req, res) => {
    res.status(200).json(portfolioData.habilidades);
});

app.post('/habilidades', (req, res) => {
    portfolioData.habilidades = {
        competenciasTecnicas: req.body.competenciasTecnicas || portfolioData.habilidades.competenciasTecnicas,
        idiomas: req.body.idiomas || portfolioData.habilidades.idiomas
    };
    res.status(201).json({ mensagem: "Habilidades adicionadas com sucesso!", habilidades: portfolioData.habilidades });
});

app.put('/habilidades', (req, res) => {
    portfolioData.habilidades = {
        competenciasTecnicas: req.body.competenciasTecnicas || portfolioData.habilidades.competenciasTecnicas,
        idiomas: req.body.idiomas || portfolioData.habilidades.idiomas
    };
    res.status(200).json({ mensagem: "Habilidades atualizadas com sucesso!", habilidades: portfolioData.habilidades });
});

app.delete('/habilidades', (req, res) => {
    const habilidadesAnterior = portfolioData.habilidades;
    portfolioData.habilidades = {
        competenciasTecnicas: [],
        idiomas: []
    };
    res.status(200).json({ mensagem: "Habilidades deletadas com sucesso!", habilidades: habilidadesAnterior });
});

// ========== DOCUMENTOS ==========
app.get('/documentos', (req, res) => {
    res.status(200).json(portfolioData.documentos);
});

app.post('/documentos', (req, res) => {
    const novoDocumento = {
        id: portfolioData.documentos.length > 0 ? Math.max(...portfolioData.documentos.map(d => d.id)) + 1 : 1,
        titulo: req.body.titulo,
        arquivo: req.body.arquivo
    };
    
    portfolioData.documentos.push(novoDocumento);
    res.status(201).json({ mensagem: "Documento adicionado com sucesso!", documento: novoDocumento });
});

app.put('/documentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const documento = portfolioData.documentos.find(d => d.id === id);
    
    if (documento) {
        documento.titulo = req.body.titulo || documento.titulo;
        documento.arquivo = req.body.arquivo || documento.arquivo;
        
        res.status(200).json({ mensagem: "Documento atualizado com sucesso!", documento });
    } else {
        res.status(404).json({ erro: "Documento não encontrado." });
    }
});

app.delete('/documentos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = portfolioData.documentos.findIndex(d => d.id === id);
    
    if (index !== -1) {
        const excluido = portfolioData.documentos.splice(index, 1);
        res.status(200).json({ mensagem: "Documento deletado com sucesso!", documento: excluido });
    } else {
        res.status(404).json({ erro: "Documento não encontrado." });
    }
});

// ========== CERTIFICADOS ==========
app.get('/certificados', (req, res) => {
    res.status(200).json(portfolioData.certificados);
});

app.get('/certificados/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const certificado = portfolioData.certificados.find(c => c.id === id);
    
    if (certificado) {
        res.status(200).json(certificado);
    } else {
        res.status(404).json({ erro: "Certificado não encontrado." });
    }
});

app.post('/certificados', (req, res) => {
    const novoCertificado = {
        id: portfolioData.certificados.length > 0 ? Math.max(...portfolioData.certificados.map(c => c.id)) + 1 : 1,
        titulo: req.body.titulo,
        arquivo: req.body.arquivo
    };
    
    portfolioData.certificados.push(novoCertificado);
    res.status(201).json({ mensagem: "Certificado adicionado com sucesso!", certificado: novoCertificado });
});

app.put('/certificados/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const certificado = portfolioData.certificados.find(c => c.id === id);
    
    if (certificado) {
        certificado.titulo = req.body.titulo || certificado.titulo;
        certificado.arquivo = req.body.arquivo || certificado.arquivo;
        
        res.status(200).json({ mensagem: "Certificado atualizado com sucesso!", certificado });
    } else {
        res.status(404).json({ erro: "Certificado não encontrado." });
    }
});

app.delete('/certificados/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = portfolioData.certificados.findIndex(c => c.id === id);
    
    if (index !== -1) {
        const excluido = portfolioData.certificados.splice(index, 1);
        res.status(200).json({ mensagem: "Certificado deletado com sucesso!", certificado: excluido });
    } else {
        res.status(404).json({ erro: "Certificado não encontrado." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Testes as rotas da API em http://localhost:${PORT}/projetos`);
});
