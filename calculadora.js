
var num1 = "";
var num2 = "";

var mostra_soma = "";

var operação = ""

var operação;
var pegando_primeiro_num = false;
var resultado = false


function _Numero(getnum){

    var n = getnum

    if (resultado == true){
        resultado = false;
        num1 = n;
        mostra_soma = n ;

    } else{
        if (pegando_primeiro_num == false) {
            num1 += n;
            
        }else{
            num2 += n;
            
        }
        mostra_soma += n  ;                          
    }

    document.getElementById("caixa_de_resultado").innerHTML = mostra_soma ;
   
}


function _operação(o){

    if(num1 != "" && num2 == ""){

        if (operação != ""){

            mostra_soma = mostra_soma.slice(0, -3);
            document.getElementById("caixa_de_resultado").innerHTML = mostra_soma;

        
        }
        operação = o
        
        var r = " " + operação + " "

        resultado = false
        pegando_primeiro_num = true;
       
        mostra_soma += r;
        document.getElementById("caixa_de_resultado").innerHTML = mostra_soma;
        
    }
    
   }


function igual(){
    if(num2 != ""){

        switch(operação){
            case "+":
                var r = parseFloat(num1)+parseFloat(num2);
                break;
            case "-":
                var r = parseFloat(num1)-parseFloat(num2);
                break;
            case "*":
                var r = parseFloat(num1)*parseFloat(num2);
                break;
            case "/":
                var r = parseFloat(num1)/parseFloat(num2);
                break;
        }

        mostra_soma += " = "+ r ;
        document.getElementById("caixa_de_resultado").innerHTML = mostra_soma;

        pegando_primeiro_num = false;
        resultado = true;
        num1 = ""+r;
        num2 = "";
        operação = "";

    }
}

function _clear(){

    document.getElementById("caixa_de_resultado").innerHTML = ""
    pegando_primeiro_num = false
    num1 = ""
    num2 = ""
    mostra_soma = ""

}

function _delete(){
   
    if(num1 != "" && resultado == false && mostra_soma.substring(mostra_soma.length-1, mostra_soma.length) != " "){

        if(pegando_primeiro_num == false){

            num1 = num1.slice(0, -1)
        
        }else{

            num2 = num2.slice(0, -1)
        }

    mostra_soma = mostra_soma.slice(0, -1)
    document.getElementById("caixa_de_resultado").innerHTML = mostra_soma
    console.log("apagando")
    }
}