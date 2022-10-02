export default class Calculator{

    constructor(){
        this.arrayEquation = new Array("")
        this.logMath = ''
    }
    
    isOperator(elementArray){
        let l = this.arrayEquation.length -1

        if(
            elementArray === '+' ||
            elementArray === '-' ||
            elementArray === '*' || 
            elementArray === '/'
        ){ return true } else { return false}
    }
    
    setOperator(operator, array){
    
        let l = array.length
    
        if (l > 0 && !this.isOperator(array[l -1])) {
    
            array.push(operator)
    
        } else if(this.isOperator(array[l -1])){
                
            array[l-1] = operator
            
        } else if (l === 0 && operator === '-'){
            array.push(operator)
        } else{
            return false
        }

        return array

    }

    log(array){
        let log = ""
        if(array.length > 0){
            array.forEach(e => {
                log += e + " "
            });
        }
        return log
    }
    
    equal(array){

        while (this.isOperator(array[array.length -1])){
            array.pop()
        }

        const math =(o, position) =>{
            
            let p = parseFloat(array[position - 1])
            let s = parseFloat(array[position + 1])
            let t 
        
            switch (o) {
                case '+':
                    t = p + s
                    break;
            
                case '-':
                    t = p - s
                    break;
        
                case '*':
                    t = p * s
                    break;
                
                case '/':
                    t = p / s
                    break;
            }
        
            array[position -1 ] = t
            array.splice(position, 2)
        }
     
        if (array.length > 2) {
    
            //busca e faz as operações de multiplicar e dividar *primeiro*
            for (let i = 0; i < array.length; i++) {
    
                switch (array[i]) {
                    
                    case '*':
                        math('*', i)
                        i = 0
                        break;
    
                    case '/':
                        math('/', i)
                        i = 0
                        break;
    
                }
            }
            //termina o resto da conta
            for (let i = 0; i < array.length; i++) {
    
                switch (array[i]) {
                    
                    case '-':
                        math('-', i)
                        i = 0
                        break
    
                    case '+':
                        math('+', i)
                        i = 0
                        break
                }
            }
        }
        return array;
    }
    
    eraser(array){
        let l = array.length

        if (l > 0 ) {
            let e = array[l-1]
            e.length === 1 ? array = array.slice(0, -1) : array[l-1] = e.toString().slice(0, -1);
            array = array.length === 0 ? [""] : array
        }
       return array
    }


    
    b_click(n){
        
        let array = this.arrayEquation
        const l = array.length

        switch (n) {
    
            //Escolha do operador
            case '+':
                array = this.setOperator('+', array)
                break;
    
            case '-':
                array = this.setOperator('-', array)
                break;
    
            case '*':
                array = this.setOperator('*', array)
                break;
    
            case '/':
                array = this.setOperator('/', array)
                break;
    
            case ".":
                let dot = array.filter(function(e){
                    return e.indexOf(".") > -1;
                })
                if(dot.length === 0){
                    array[0] === ''  ? array.push('0.') : array[l - 1] += '.' ;
                }
                break;

            case "=":
                this.logMath = this.log(array)
                this.equal(array);
                break;
    
            case "c":
                while (array.length > 0) {
                    array.pop()
                }
                array[0] = ''
                this.logMath = ''
                break;
    
            case "√":
                this.logMath = "√"+this.log(array)
                array[0] = Math.sqrt(this.equal(array)[0])
                break;
    
            case "%":
                this.logMath = this.log(array)+"% 100"
                array[0] = this.equal(array)[0]/100
                break;
    
            case "apagar":
                array = this.eraser(array)
                this.arrayEquation = array
                break;
    
            //contrui o numero que sera usado na conta
            default:
                let lmax = 0

                for (let index = 0; index < array.length; index++) {
                    lmax += array[index].toString().length;  
                }
        
                if (lmax < 8) {
                    if(this.isOperator(array[l - 1]) || l === 0 || array[l - 1] === '0'){
                        array.push(n)
                    } else{
                        array[l - 1] += n ;
                    } 
                }
                
                break;
        }

        console.log(array)
        array[0] = array.length === 1 && array[0].toString().length > 9 ? [parseFloat(array[0]).toExponential(5)] : array[0]
        return [this.log(array), this.logMath]
    }    
}