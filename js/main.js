const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = [];

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const itemNome = evento.target.elements['nome'];
    const itemQuantidade = evento.target.elements['quantidade'];
    
    criarElemento(itemNome.value,itemQuantidade.value);

    itemNome.value = "";
    itemQuantidade.value = "";
})

function criarElemento(nome, quantidade) {
    // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    //adiciona a class item ao li criado
    novoItem.classList.add('item')
    //cria o strong e adiciona o texto com o parametro quantidade
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;
    //cria uma nova li no html e dentro dessa li tem um strong e apos o strong o nome do item no html
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;
    //usa a constante lista pra add um novo item no html 
    lista.appendChild(novoItem);

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual);

    localStorage.setItem("item", JSON.stringify(itens));
    
    
    // console.log(novoItem)
}