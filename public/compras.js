function inserir() {
    try {
   
        let inputInserir = document.getElementById("inserir");
        let lista = document.getElementById("sessao");

        
        if (!inputInserir || !lista) {
            throw new Error("Elementos necessários do HTML não foram encontrados.");
        }

        let ord = inputInserir.value.trim(); 

   
        if (ord === "") {
            alert("Por favor, digite um item antes de adicionar!");
            return; 
        }


        let li = document.createElement("li");
        let btn = document.createElement("button");
        let div = document.createElement("div");
        let span = document.createElement("span");
        let check = document.createElement("input");
        
        check.type = "checkbox";
        
        span.textContent = ord; 
        
        // Evento do Checkbox
        check.onclick = function() {
            if (check.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none";
            }
        };
        
        btn.innerHTML = "Excluir";
        btn.onclick = function() {
            li.remove();
         
            br.remove(); 
        };
        btn.className = "bt";

        div.appendChild(check);
        div.appendChild(span);
        div.appendChild(btn);
        li.appendChild(div);    
        lista.appendChild(li);
        
       
        let br = document.createElement('br');
        lista.appendChild(br);

        
        inputInserir.value = "";

    } catch (error) {
        
        console.error("Ocorreu um erro ao inserir o item: ", error.message);
        alert("Não foi possível adicionar o item. Por favor, tente novamente.");
    }
}

  