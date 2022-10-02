import Calculator from './calculator.js'

function create_button(conteudo, id, onclick){
    const _button = document.createElement("button");
    _button.innerText = conteudo;
    _button.setAttribute("id", id)
    _button.addEventListener("click", ()=>{
        let log = calculator.b_click(onclick)
        let input = log[0]

        document.querySelector("#input_Calculo").innerText = log[0]
        document.getElementById("log").innerText = log[1]
    })

    return _button
}

const botoes = document.createElement("div");
botoes.setAttribute("id", "botoes")
botoes.append(
    create_button("+", "especial", '+'),
    create_button("%", "especial", '%'),
    create_button("√", "especial", '√'),
    create_button("C", "especial", 'c'),
    )

for (let i = 9; i > -1; i--) 
{ 
    switch (i) {
        case 9:
            botoes.append(create_button('-', "especial", '-'))
            break;
        case 6:
            botoes.append(create_button('x', "especial", '*'))
            break;
        case 3:
            botoes.append(create_button('÷', "especial", '/' ))
            break;
        case 0:
            botoes.append(create_button("=","igual", '='))
            botoes.append(create_button('⌫', "extra", 'apagar'))
            botoes.append(create_button('.', "extra", '.'))
            break;
    }

    botoes.append(create_button( i, "number", `${i}`))
}

const log = document.createElement("p");
log.setAttribute("id", "log")

const inputCalculo = document.createElement("h2");
inputCalculo.setAttribute("id", "input_Calculo")
inputCalculo.setAttribute("maxlength", "15")

const calculadora = document.createElement("div");
calculadora.setAttribute("id", "calculadora")

calculadora.append(
    log,
    inputCalculo,
    botoes
)

document.body.append(calculadora)

const calculator = new Calculator();