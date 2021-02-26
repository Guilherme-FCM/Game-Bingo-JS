var bingo = {
    criarListaNumeros: function(numeros) {
        for (x=1;x<=75;x++) {
            if (x < 10) {x = '0' + x}
            numeros.push(x)
        }
        return numeros
    },

    tomi: function(lista) {
        var y = []
        w = 1
        for (z=0;z<5;z++){
            for (x=1;x<=15;x++) { 
                if (w < 10) {w = '0' + w}      
                y.push(w)   
                w++  
            }    
            lista.push(y)
            y = []
        }
        return lista
    },

    criarListaJogo: function(numeros) {
        lista = []
        y = []
        w = 1
        for (z=0;z<5;z++){
            for (x=1;x<=numeros.length/5;x++) { 
                if (w < 10) {w = '0' + w}      
                y.push(w)   
                w++  
            }    
            lista.push(y)
            y = []
        }
        c = 0
        x = 0
        var lista_sorteados = []
        div = numeros.length/5
        ar = 0
        while (x < 25) { 
            aleatorio = Math.floor(Math.random() * (div - ar))
            var sorteado = lista[c][aleatorio]
            lista[c].splice(aleatorio, 1)
            lista_sorteados.push(sorteado)
            ar++
            x++
            if (x % 5 == 0) {
                c++
                ar = 0
            }
        }
        lista_sorteados.sort()
        lista_sorteados.splice(12,1,'X')
        return lista_sorteados
    },

    completarCartela: function(lista_game, classe) {
        cont = 0
        lista_game.forEach( x => {
            document.getElementsByClassName(classe)[cont].innerHTML = x
            cont++
        })
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    check_win: function(lista) {
        cont = 0
        lista.forEach(valor =>{
            if (valor.innerHTML == 'X') {cont++}
        })
        return cont
    }, 
    winner: function() {
        contMaq = bingo.check_win(cartelaMaquina)
        contJog = bingo.check_win(cartelaJogador)
        if (contMaq == contJog && contMaq == 25) {
            alert('Empate Técnico!')
            window.location.reload()
        } else if (contMaq == 25) {
            alert('MAQUINA Venceu!')
            window.location.reload()
        } else if (contJog == 25) {
            alert('Jogador Venceu!')
            window.location.reload()
        }
    },
    atualizarJogo: function() {
        cartelaJogador.forEach(function (x, idx){
            if (x.innerHTML == 'X') {
                cartelaJogador[idx].classList.add('sem-cursor') 
                cartelaJogador[idx].classList.add('red')
            }
        })
        cartelaMaquina.forEach(function (x, idx){
            if (x.innerHTML == 'X') {
                cartelaMaquina[idx].classList.add('sem-cursor') 
                cartelaMaquina[idx].classList.add('red')
            }
        })
        bingo.winner()
    },
    marcar_j: function(element) {
        if (element.target.innerHTML == sorteado) {
            element.target.innerHTML = 'X'
            bingo.atualizarJogo()
            ok = true
        }  
        bingo.winner()
    },
    marcar_m: function(element) {
        element.innerHTML = 'X'
        bingo.atualizarJogo()
        bingo.winner()
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    montarCartelaDinamica: function() {
        conteiner = document.querySelectorAll('.conteiner-jogo')
        conteiner.forEach(function(valor, idx) {
            for (let y = 0; y<=24; y++) {           
                element = document.createElement('div')
                element.classList.add('quadro')
                classe = ((idx==0)?element.classList.add('jogadores'):element.classList.add('maquinas'))
                element.addEventListener("click", bingo.marcar_j)
                conteiner[idx].appendChild(element)
            }
        })
    }
}
function gerarNumero() {
    if (ok) {
        ok = false
        var aleatorio = Math.floor(Math.random() * numeros.length)
        sorteado = numeros[aleatorio]
        numeros.splice(aleatorio, 1)
        document.getElementById('valor').innerHTML = sorteado 
    }
    for (x in cartelaJogador){
        if (cartelaJogador[x].innerHTML != sorteado) {ok = true}
        else {
            ok = false;
            break;
        }
    }
    document.querySelectorAll('.maquinas').forEach(elemento => {
        if (elemento.innerHTML == sorteado) {
            bingo.marcar_m(elemento)
        }
    })
}

var sorteado;
var conteiner;
bingo.montarCartelaDinamica()
numeros = []
bingo.criarListaNumeros(numeros)
lista_jogador = bingo.criarListaJogo(numeros)
bingo.completarCartela(lista_jogador, 'jogadores')
lista_maquina = bingo.criarListaJogo(numeros)
bingo.completarCartela(lista_maquina, 'maquinas')
var cartelaMaquina = document.querySelectorAll('.maquinas')
var cartelaJogador = document.querySelectorAll('.jogadores')
var ok = true
bingo.atualizarJogo()
