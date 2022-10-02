
//variaveis globais
var equacao = []
var num = null
var log = null

//cria uma tag html
function add_tag(tag, txt, attr) 
{
    [txt, attr] = _undefined(txt, attr)
    return '<'+tag+' '+attr+'>'+txt+'</'+tag+'>'
}

//transforma undefined em ""
function _undefined(txt, attr)
{
    txt == undefined || null || "" ? txt = "" : txt
    attr == undefined || null || ""? attr = "" : attr
    //retorna dois valores em um array
    return [txt, attr]
}

function _operador(o){


    let l = equacao.length

//addiciona a variavel numero e o operador a lista para depois fazer a conta 
    if (num != null && num != o ) {

        console.log("-----inserindo de operadores : ("+o+") -----")

        equacao.push(num)
        equacao.push(o)

        num = null
        document.getElementById("input_Calculo").innerHTML += " "+o+" "

//troca o operador, ex. (+) por (-)
    } else if(equacao[l -1] == "*" || equacao[l-1] == "+" || equacao[l-1] == "-" || equacao[l-1] == "/"){
        
        console.log("-----trocando de operadores: ("+o+") -----")

        equacao.splice(l-1, 1)
        document.getElementById("input_Calculo").innerHTML = document.getElementById("input_Calculo").textContent.slice(0, -3)

        equacao[equacao.length] = o
        document.getElementById("input_Calculo").innerHTML += " "+o+" "
        
    } else if (num == null && equacao.length == 0 && o == "-"){

        num = "-"
        document.getElementById("input_Calculo").innerHTML += " - "

    }

    console.log(equacao)
}

//executa a conta
function operacao(o, posicao){

    equacao[equacao.length] = num

    let p 
    let s 
    let t 

    p = parseFloat(equacao[posicao - 1])
    s = parseFloat(equacao[posicao + 1])

    switch (o) {
        case "+":
            t = p + s
            break;
    
        case "-":
            t = p - s
            break;

        case "*":
            t = p * s
            break;
        
        case "/":
            t = p / s
            break;
    }

    equacao[posicao -1 ] = t

    equacao.splice(posicao, 2)
}

function b_click(n){

    switch (n) {

        //Escolha do operador
        case "+":
            _operador("+")
            break;

        case "-":
            _operador("-")
            break;

        case "*":
            _operador("*")
            break;

        case "/":
            _operador("/")
            break;

        case ".":
            
            document.getElementById("input_Calculo").innerHTML += num == null ? "0." : "."
            num == null ? num = "0." : num += "."
            break;

        //faz a conta
        case "=":

            if(num != null){
                if (equacao.length > 1) {

                    //busca e faz as operações de multiplicar e dividar *primeiro*
                    for (let i = 0; i < equacao.length; i++) {

                        switch (equacao[i]) {
                            
                            case "*":
                                operacao("*", i)
                                break;

                            case "/":
                                operacao("/", i)
                                break;

                        }
                    }
                    //termina o resto da conta
                    for (let i = 0; i < equacao.length; i++) {
                        

                        switch (equacao[i]) {
                            
                            case "-":
                                operacao("-", i)
                                break

                            case "+":
                                operacao("+", i)
                                break
                        }

                        if (equacao.length == 3) {
                            i = 0
                        }
                    }

                    document.getElementById("log").innerHTML = document.getElementById("input_Calculo").textContent
                    document.getElementById("input_Calculo").innerHTML = equacao
                    num = equacao[0]
                    equacao = []

                }
            }
            break;

            // apaga tudo
            case "c":
                document.getElementById("log").innerHTML = null
                document.getElementById("input_Calculo").innerHTML = null
                num = null 
                equacao = []
                break;

            //raiz quadrada
            case "√":
                document.getElementById("log").innerHTML = "√"+num
                num = Math.sqrt(num) 
                document.getElementById("input_Calculo").innerHTML = parseFloat(num.toFixed(10))
                equacao = []
                break;

            //porcentagem
            case "%":
                document.getElementById("log").innerHTML = num + "% 100"
                num = num/100
                document.getElementById("input_Calculo").innerHTML = num
                equacao = []
                break;

            //apaga apenas o ultimo caractere
            case "apagar":

                if (equacao != [] && num == null) {
                    
                    let l = parseFloat(equacao.length) - 1
                    num = equacao[l]
                    
                    if(equacao[l] == "x" || equacao[l] == "+" || equacao[l] == "-" || equacao[l] == "x"){
                        document.getElementById("input_Calculo").innerHTML = document.getElementById("input_Calculo").textContent.slice(0, -2)
                        num = equacao [l -1]
                    }
                    equacao.splice(l - 1, 2)

                } else if (num != null) {
                    num = num.toString()
                    num = num.slice(0, -1)
                }
                
                document.getElementById("input_Calculo").innerHTML = document.getElementById("input_Calculo").textContent.slice(0, -1)
                num == undefined ? num = null : null

                console.log(equacao)
                console.log("num :"+num)
                break;
        //contrui o numero que sera usado na conta
        default:
            if(num != null && num.length > 11){}
            else{
            num == null ? num = n.toString() : num += n.toString()

            document.getElementById("input_Calculo").innerHTML += n.toString()
        }
            break;
    }

    return n
}

//-------------------Criação da calculadora-------------------// 

//cria botões especiais
var butoes_numericos = add_tag("button", '+', "id='especial' onclick = b_click('+')")+ add_tag("button", '%', "id='especial' onclick = b_click('%')")+ add_tag("button", '√', "id='especial' onclick = b_click('√')")+add_tag("button", "C", "id='especial' onclick = b_click('c')")

//cria botões numeros e operadores
for (let i = 9; i > -1; i--) 
    { 
        switch (i) {
            case 9:
                butoes_numericos += add_tag("button", '-', "id='especial' onclick = b_click('-')")
                break;
            case 6:
                butoes_numericos += add_tag("button", 'x', "id='especial' onclick = b_click('*')")
                break;
            case 3:
                butoes_numericos += add_tag("button", '÷', "id='especial' onclick = b_click('/')" )
                break;
            case 0:
                butoes_numericos += add_tag("button", "=","id='igual' onclick = b_click('=')")
                butoes_numericos += add_tag("button", '⌫', "onclick = b_click('apagar')")
                butoes_numericos += add_tag("button", '.', "onclick = b_click('.')")
                break;
        }
        butoes_numericos += add_tag("button", i, "onclick = b_click("+i+")")
    }

//Cria 2 div filhas de uma div grid 
var div_grid= add_tag("div", add_tag("div", butoes_numericos, "id=celula_botões_numericos"), "id = grid")
// tags <p> e <h2>
document.write(add_tag("div",'<p id= "log"></p><h2 id= "input_Calculo" maxlength="15"></h2>'+ div_grid, "id=calculadora"))

