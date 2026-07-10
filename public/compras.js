document.addEventListener("DOMContentLoaded", carregarItens);

async function carregarItens() {
    try {
        const resposta = await fetch("/itens");
        const itens = await respuesta.json();
        
        let lista = document.getElementById("sessao");
        lista.innerHTML = ""; 
        itens.forEach(item => {
            renderizarItemNaTela(item);
        });
    } catch (error) {
        console.error("Erro ao carregar itens:", error);
    }
}

function renderizarItemNaTela(item) {
    let lista = document.getElementById("sessao");

    let li = document.createElement("li");
    let btn = document.createElement("button");
    let div = document.createElement("div");
    let span = document.createElement("span");
    let check = document.createElement("input");
    
    check.type = "checkbox";
    check.checked = item.comprado;
    
    span.textContent = item.nome; 
    if (item.comprado) {
        span.style.textDecoration = "line-through";
    }
    
   
    check.onclick = async function() {
        try {
            const resposta = await fetch(`/itens/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comprado: check.checked })
            });
            
            if (resposta.ok) {
                span.style.textDecoration = check.checked ? "line-through" : "none";
            }
        } catch (error) {
            console.error("Erro ao atualizar item:", error);
        }
    };
    
    btn.innerHTML = "Excluir";
  
    btn.onclick = async function() {
        try {
            const resposta = await fetch(`/itens/${item.id}`, { method: "DELETE" });
            if (resposta.ok) {
                li.remove();
                br.remove(); 
            }
        } catch (error) {
            console.error("Erro ao deletar item:", error);
        }
    };
    btn.className = "bt";

    div.appendChild(check);
    div.appendChild(span);
    div.appendChild(btn);
    li.appendChild(div);    
    lista.appendChild(li);
    
    let br = document.createElement('br');
    lista.appendChild(br);
}


async function inserir() {
    try {
        let inputInserir = document.getElementById("inserir");
        let ord = inputInserir.value.trim(); 

        if (ord === "") {
            alert("Por favor, digite um item antes de adicionar!");
            return; 
        }

       
        const resposta = await fetch("/itens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: ord })
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível salvar no servidor.");
        }

        const novoItem = await resposta.json();
        
 
        renderizarItemNaTela(novoItem);
        
        inputInserir.value = "";

    } catch (error) {
        console.error("Ocorreu um erro ao inserir o item: ", error.message);
        alert("Não foi possível adicionar o item. Por favor, tente novamente.");
    }
}