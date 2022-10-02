import Calculator from '../calculator'

 const c = new Calculator();

test("isOperator?", ()=>{
    expect( c.isOperator("+") ).toBe(true);
})

test("set operator in array with without number before.", ()=>{
    expect( c.setOperator("+", [])).toBe(false);
})

test("set operator negative.", ()=>{
    expect( JSON.stringify(c.setOperator("-", []))).toBe('["-"]')
    ;
})

test("set operator in array that already have number", ()=>{
    expect( JSON.stringify(c.setOperator("-", [1]))).toBe('[1,"-"]')
    ;
})

test("sum", ()=>{
    expect( JSON.stringify(c.equal([1,"+",2]))).toBe('[3]')
    ;
})

test("subtraction", ()=>{
    expect( JSON.stringify(c.equal([1,"-",2]))).toBe('[-1]')
    ;
})

test("division", ()=>{
    expect( JSON.stringify(c.equal([2,"/",2]))).toBe('[1]')
    ;
})

test("multiplication", ()=>{
    expect( JSON.stringify(c.equal([2,"*",2]))).toBe('[4]')
    ;
})

test("several math", ()=>{
    expect( JSON.stringify(c.equal([2,"+",2,"-",4,"/",2,"*",2]))).toBe('[0]')
    ;
})

test("extra operator", ()=>{
    expect( JSON.stringify(c.equal([1,"+","+","+"]))).toBe('[1]')
    ;
})

test("eraser", ()=>{
    expect( JSON.stringify(c.eraser([222]))).toBe(JSON.stringify(["22"]))
    ;
})

test("eraser with operator", ()=>{
    expect( JSON.stringify(c.eraser([222 ,"+"]))).toBe("[222]")
    ;
})

test("dot without number", ()=>{
    expect( JSON.stringify(c.b_click("."))).toBe(JSON.stringify(["0. ", ""]))
    ;
})


test("eraser", ()=>{
    c.arrayEquation = ["999"]
    expect( JSON.stringify(c.b_click("apagar"))).toBe(JSON.stringify(["99 ",""]))
    ;
})

test("dot with number", ()=>{
    c.arrayEquation = ["9"]
    expect( JSON.stringify(c.b_click("."))).toBe(JSON.stringify(["9. ", ""]))
    ;
})

test("number already with dot", ()=>{
    c.arrayEquation = ["9."]
    expect( JSON.stringify(c.b_click("."))).toBe(JSON.stringify(["9. ", ""]))
    ;
})

test("100%", ()=>{
    c.arrayEquation = ["20"]
    expect( JSON.stringify(c.b_click("%"))).toBe(JSON.stringify(["0.2 ","20 % 100"]))
    ;
})

test("square root", ()=>{
    c.arrayEquation = ["9"]
    expect( JSON.stringify(c.b_click("√"))).toBe(JSON.stringify(["3 ","√9 "]))
    ;
})

test("clear", ()=>{
    c.arrayEquation = ["9999"]
    expect( JSON.stringify(c.b_click("c"))).toBe(JSON.stringify([" ",""]))
    ;
})



