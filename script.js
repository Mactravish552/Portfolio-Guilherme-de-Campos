// Mensagem de saudação baseada no horário do dia
function obterSaudacao() {
    const hora = new Date().getHours();
    
    if (hora >= 6 && hora < 12) {
        return "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        return "Boa tarde!";
    } else {
        return "Boa noite!";
    }
}

function exibirSaudacaoNaTela() {
    const elementoTitulo = document.getElementById("titulo-saudacao");
    
    const mensagem = obterSaudacao();
    
    if (elementoTitulo) {
        elementoTitulo.textContent = mensagem;
    }
}

exibirSaudacaoNaTela();


// Modo Admin para edição de conteúdo
const SENHA_ADMIN = "fatec2026";
const SECOES_EDITAVEIS = ["formacao", "experiencia", "habilidades", "projetos", "documentosTrabalhos", "certificados"];

document.getElementById('btn-admin').addEventListener('click', (e) => {
    e.preventDefault();
    const senha = prompt("Digite a senha de administrador:");
    
    if (senha === SENHA_ADMIN) {
        alert("Modo Admin Ativado! Clique nos textos para editá-los.");
        ativarModoEdicao();
    } else {
        alert("Senha incorreta!");
    }
});

function ativarModoEdicao() {
    SECOES_EDITAVEIS.forEach(idSecao => {
        const secao = document.getElementById(idSecao);
        if (secao) {
            secao.contentEditable = "true";
            secao.style.border = "2px dashed #ff0000";
            secao.style.padding = "10px";
            
            secao.addEventListener('input', () => {
                localStorage.setItem(`portifolio_${idSecao}`, secao.innerHTML);
            });
        }
    });

    const aviso = document.createElement("div");
    aviso.id = "banner-admin";
    aviso.innerHTML = "💻 MODO ADMIN ATIVADO: Edite os textos livremente. <button id='btn-sair-admin' style='margin-left: 15px; padding: 5px; background: white; color: red; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;'>Sair</button> <button id='btn-reset-admin' style='margin-left: 10px; padding: 5px; background: #ffcc00; color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;'>Descartar Edições</button>";
    aviso.style.position = "fixed";
    aviso.style.top = "0";
    aviso.style.left = "0";
    aviso.style.width = "100%";
    aviso.style.backgroundColor = "red";
    aviso.style.color = "white";
    aviso.style.textAlign = "center";
    aviso.style.padding = "10px";
    aviso.style.zIndex = "9999";
    
    // Evita duplicar o banner caso clique várias vezes
    const bannerExistente = document.getElementById("banner-admin");
    if (bannerExistente) bannerExistente.remove();

    document.body.prepend(aviso);

    document.getElementById("btn-sair-admin").addEventListener('click', desativarModoEdicao);
    
    document.getElementById("btn-reset-admin").addEventListener('click', () => {
        if(confirm("ISSO APAGARÁ AS ALTERAÇÕES FEITAS AQUI. O site voltará a carregar as informações diretamente do arquivo index.html. Deseja continuar?")) {
            SECOES_EDITAVEIS.forEach(idSecao => {
                localStorage.removeItem(`portifolio_${idSecao}`);
            });
            alert("Memória limpa! A página será recarregada com o conteúdo do seu arquivo HTML.");
            location.reload();
        }
    });
}

function desativarModoEdicao() {
    SECOES_EDITAVEIS.forEach(idSecao => {
        const secao = document.getElementById(idSecao);
        if (secao) {
            secao.contentEditable = "false";
            secao.style.border = "none";
            secao.style.padding = "20px";
        }
    });

    const banner = document.getElementById("banner-admin");
    if (banner) {
        banner.remove();
    }
    alert("Modo Admin Desativado!");
}

// Carregar o conteúdo salvo quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    SECOES_EDITAVEIS.forEach(idSecao => {
        const conteudoSalvo = localStorage.getItem(`portifolio_${idSecao}`);
        if (conteudoSalvo) {
            const secao = document.getElementById(idSecao);
            if (secao) {
                secao.innerHTML = conteudoSalvo;
            }
        }
    });
});


