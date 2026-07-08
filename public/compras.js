function inserir() {
    
    let ord = document.getElementById("inserir").value;
    let lista = document.getElementById("sessao");


    let li = document.createElement("li");
    let btn = document.createElement("button");
    let div = document.createElement("div");
    let span = document.createElement("span");
    let check = document.createElement("input");
    check.type = "checkbox";
    span.innerHTML = ord;
    
    check.onclick = function() {
        if(check.checked) {
            span.style.textDecoration =  "line-through"
        }
        else {
            span.style.textDecoration = "none";
        }
  }
  
    
    btn.innerHTML = "Excluir";
    btn.onclick = function() {
        li.remove();
    }
    btn.className = "bt";
    div.appendChild(check);
    div.appendChild(span);
    div.appendChild(btn);

    
    li.appendChild(div);    
    lista.appendChild(li)
    
    let br = document.createElement('br');
    document.getElementById("sessao").appendChild(br);


}

  