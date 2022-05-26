//Definindo a dimesão do palco do jogo
let altura = 0
let largura = 0
let vidas = 1
let tempo = 60
let moscasMatadas = 0

let criaMoscaTempo = 1500

//logica dificuldade
let nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
    //1500
    criaMoscaTempo = 1500
} else if(nivel === 'dificil') {
    //1000
    criaMoscaTempo = 1000
} else if (nivel === 'extremo') {
    //750
    criaMoscaTempo = 750
}

function ajustaTamanhoPalcoJogo() {
    altura  = window.innerHeight
    largura = window.innerWidth

    
    console.log(largura, altura) 
}   
       
ajustaTamanhoPalcoJogo()

let cronometro = setInterval(function() {

    tempo -= 1

    if(tempo < 0) {
        //elimnando a execução das funções na memoria
        clearInterval(cronometro)
        clearInterval(criaMosca)
        // alert('Vitória!')
        //redirecionar para a pagina de vitória
        window.location.href = "vitoria.html"
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
    
}, 1000);

function posicaoRandomica() {

    //remover a mosca anterior (caso exista)
    if(document.getElementById('mosca')) {
        document.getElementById('mosca').remove()

        //remover vidas caso a mosca for removida pelo if
        if(vidas > 3) {

            // alert('Interroper o jogo (game over)')
            window.location.href = 'fim_de_jogo.html'

        } else {
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"

            vidas++
        }
        
    }
    

    //Criando posições randômicas
    //coordenadas x e y produzidas dinamicamentes cujo os limitantes é o tamanho da janela
    let posicaoX = Math.floor(Math.random() * largura) - 90
    let posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //criar o elemento html
    let mosca = document.createElement('img')
    mosca.src = 'imagens/mosca.png'
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio() //retornar e definir classes
    console.log(mosca.className)
    mosca.style.left = posicaoX + 'px'
    mosca.style.top = posicaoY + 'px'
    mosca.style.position = 'absolute'
    mosca.id = 'mosca'
    //remover elemento mosca atraves do onclick
    mosca.onclick = function() {
        this.remove()
    //Contabilizar moscas mortas 
        document.getElementById('score').innerHTML = moscasMatadas + 1

        moscasMatadas++
    }

    //adicionando um filho para o body
    document.body.appendChild(mosca)
    
}          

//Tamanhos randômicos
function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosca01'

        case 1:
            return 'mosca02'

        case 2:
            return 'mosca03'
    }
}

//LADO A | LADO B
function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'

    }
}