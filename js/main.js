const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página
itens.forEach((elemento) => {
    criarElemento(elemento)
});


form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    
    //busca no array se o elemento na possicao nome ja existe
    const existe = itens.find( elemento => elemento.nome === nome.value)

    // cria o objeto do item atual
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }


    // se existe for diferente de null
    if(existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual);
        
        // Para atualizar o nosso array nós precisamos achar a posição onde está o nosso conteúdo e também sobrescrever o conteudo
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }else {
        //obtém o último elemento do array ? cria e acrecenta um novo ID para o objeto caso o numero de ids nao seja 0
        // :  Se não houver nenhum elemento no array itens, o ID do novo objeto é definido como 0.          
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
        
        criarElemento(itemAtual);

        //.push é uma função utilizada pra add um elemento ao array
        itens.push(itemAtual);

    }
    
    //transforma o Objeto em string 
    localStorage.setItem("itens", JSON.stringify(itens));
    
    nome.value = "";
    quantidade.value = "";
})

function criarElemento(item) {
    // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    //adiciona a class item ao li criado
    novoItem.classList.add('item')
    //cria o strong e adiciona o texto com o parametro quantidade
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id
    
    //cria uma nova li no html e dentro dessa li tem um strong e apos o strong o nome do item no html
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    //cria o botao para apagar itens
    novoItem.appendChild(botaoDeleta(item.id))
    //usa a constante lista pra add um novo item no html 
    lista.appendChild(novoItem);   
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerHTML = 'X'

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id);

    })
    
    return elementoBotao

}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice[itens.findIndex[elemento => elemento.id === id],1]

    localStorage.setItem("itens", JSON.stringify(itens));

}