//stage 2
function inputButtonPrototype() {
  this.getId = function() {
    return this.id ;
  }
  this.getDisplay = function() {
    return this.display ;
  }
}
function inputButtonOperator(inputDisplay,inputID,inputType) {
  this.display =inputDisplay;
  this.id = inputID;
  var type = inputType;
  //this.evaluate
  this.getType = function() {
    return type ;
  }
}
function inputButtonOperand(inputDisplay,inputID,inputValue) {
  this.display =inputDisplay;
  this.id = inputID;
  var value = inputValue ;
  this.getValue = function() {
    return value ;
  }
}
function inputButtonList() {
  //stage 2 input buttons below
  // operators - display,id/key,type
  // operands - display,id/key,value
  const numObj = new inputButtonOperand("0","num","0") // needs to be updated
  numObj.setValue = function () {
    let inpValue ;
        let valid = false ;
        do {
          valid = true ;
          inpValue = window.prompt("enter a number between (5dp) -10^6 and 10^6")  ;
          if (inpValue == "" || inpValue == null) {
           return null ;
          }
          else  {
            inpValue = Number(inpValue) ;
          }

          //console.log(inpValue) ;
          //console.log(typeof(inpValue)) ;
          if (isNaN(inpValue)) {
            window.alert("value must be a number or float") ;
            valid = false ;
          }
          else if (inpValue % 1 != 0) { // check if number is a float
            let lengthInp = inpValue.toString().length -2 ;
            if (lengthInp > 6) {
              lengthInp = 6 ;
            }
            inpValue = Number.parseFloat(inpValue).toFixed(lengthInp) ; //round up?, truncates?
          }
          else if (inpValue >= 10**6 || inpValue <= -(10**6)) {
            window.alert("value must be between 10^-6 and 10^6") ;
            valid = false ;
          }
        } while(valid == false)
      this.value = inpValue ;
      this.display = inpValue ;

      return inpValue ;
      //window.alert(this.display) ;
      //window.alert(this.value) ;
  }
  var inputButtonList = [ 
    //unary
    new inputButtonOperator("(","(","unary") , // 0 
    new inputButtonOperator(")",")","unary") , // 1
    new inputButtonOperator("sin","sin","unary") ,// 2 
    new inputButtonOperator("cos","cos","unary"), // 3
    new inputButtonOperator("tan","tan","unary"), // 4
    new inputButtonOperator("sec","sec","unary"), // 5
    new inputButtonOperator("cosec","csc","unary"), // 6
    new inputButtonOperator("cot","cot","unary"), // 7
    new inputButtonOperator("arctan","atan","unary"),// 8
    new inputButtonOperator("arcsin","asin","unary"),// 9
    new inputButtonOperator("arccos","acos","unary"),// 10
    new inputButtonOperator("arcsec","asec","unary"),// 11
    new inputButtonOperator("arccosec","acsc","unary"),//12
    new inputButtonOperator("arccot","acot","unary"), // 13
    new inputButtonOperator("ln","le","unary"),// 14
    new inputButtonOperator("Modulus","m","unary"), // 15
    new inputButtonOperator("floor","f","unary"), // 16
    new inputButtonOperator("celing","c","unary"),// 17
    new inputButtonOperator("sinh","sinh","unary"), // 18
    new inputButtonOperator("cosh","cosh","unary"), // 19
    new inputButtonOperator("tanh","tanh","unary"),//20
    new inputButtonOperator("sech","sech","unary"),//21
    new inputButtonOperator("cosech","csch","unary"), // 22
    new inputButtonOperator("coth","coth","unary"), // 23
    new inputButtonOperator("arsinh","asinh","unary"), // 24
    new inputButtonOperator("arcosh","acosh","unary"), // 25
    new inputButtonOperator("artanh","atanh","unary"), // 26
    new inputButtonOperator("arsech","asech","unary"), // 27
    new inputButtonOperator("arcosech","acsch","unary"), // 28
    new inputButtonOperator("arcoth","acoth","unary"), // 29
    //binary
    new inputButtonOperator("x","*","binary") , // 30
    new inputButtonOperator("+","+","binary") , //31
    new inputButtonOperator("-","-","binary") , // 32
    new inputButtonOperator("/","/","binary") , // 33
    new inputButtonOperator("^","^","binary") , // 34
   //operands
    new inputButtonOperand("π","p",Math.PI) ,
    new inputButtonOperand("e","e",Math.E) ,
    new inputButtonOperand("𝑥","x","x") ,
    numObj 
  ] ;
  inputButtonList[2].eval = (a) => {return Math.sin(a)} ;
  inputButtonList[3].eval = (a) => {return Math.cos(a)} ;
  inputButtonList[4].eval = (a) => {return Math.tan(a)} ;
  
  inputButtonList[5].eval = (a) => {return 1/Math.cos(a)} ;
  inputButtonList[6].eval = (a) => {return 1/Math.sin(a)} ;
  inputButtonList[7].eval = (a) => {return 1/Math.tan(a)} ;
  
  inputButtonList[8].eval = (a) => {return Math.atan(a)} ;
  inputButtonList[9].eval = (a) => {return Math.asin(a)} ;
  inputButtonList[10].eval = (a) => {return Math.acos(a)} ;
  
  inputButtonList[11].eval = (a) => {return Math.acos(1/a)} ;
  inputButtonList[12].eval = (a) => {return Math.asin(1/a)} ;
  inputButtonList[13].eval = (a) => {return Math.PI/2 - Math.atan(1/a)} ;
  
  inputButtonList[14].eval = (a) => {return Math.log(a)} ;
  
  inputButtonList[15].eval = (a) => {return Math.sqrt((a**2))} ;
  inputButtonList[16].eval = (a) => {return Math.floor(a)} ;
  inputButtonList[17].eval = (a) => {return Math.ceiling(a)} ;
  
  inputButtonList[18].eval = (a) => {return Math.sinh(a)} ;
  inputButtonList[19].eval = (a) => {return Math.cosh(a)} ;
  inputButtonList[20].eval = (a) => {return Math.tanh(a)} ;
  
  inputButtonList[21].eval = (a) => {return 1/Math.cosh(a)} ; 
  inputButtonList[22].eval = (a) => {return 1/Math.sinh(a)} ;
  inputButtonList[23].eval = (a) => {return 1/Math.tanh(a)} ; 
  
  inputButtonList[24].eval = (a) => {return Math.acosh(a)} ;
  inputButtonList[25].eval = (a) => {return Math.asinh(a)} ;
  inputButtonList[26].eval = (a) => {return Math.atanh(a)} ;

  inputButtonList[27].eval = (a) => {return Math.asinh(1/a)} ;
  inputButtonList[28].eval = (a) => {return Math.acosh(1/a)} ;
  inputButtonList[29].eval = (a) => {return Math.atanh(1/a)} ;

  // binary
   inputButtonList[30].eval = (a,b) => {return a*b} ;
   inputButtonList[31].eval = (a,b) => {return a+b} ;
   inputButtonList[32].eval = (a,b) => {return a-b} ;
   inputButtonList[33].eval = (a,b) => {return b/a} ;
   inputButtonList[34].eval = (a,b) => {return b**a} ; // needs to be tested due to right asccoiactivity etc
  
  this.getInputButtonViaId = function(id) {
    let x = 0 ;
    if (!isNaN(id)) {
      id = "num" ;
    }
    //console.log("Id:" + id) ;
    //console.log(inputButtonList.length) ; 
    while (id != inputButtonList[x].getId() && x < inputButtonList.length -1 ) {
      //console.log(x) ;
      //console.log(inputButtonList[x]) ;
      x++ ;
    }
    //console.log(inputButtonList[x]) ;
    if (id == inputButtonList[x].getId() ) {
      //console.log(inputButtonList[x]) ;
      return inputButtonList[x] ;
    }
    else {
      console.log("not in list") ;
      return -1 ;
    }
  }
}
Object.assign(inputButtonOperator.prototype, new inputButtonPrototype()) ;
Object.assign(inputButtonOperand.prototype, new inputButtonPrototype()) ;


function memoryStack () {
  var size = 50 ;
  var stack = [] ;
  var top = 0 ;
  this.push = function (key) {
    if (top != size) {
      stack[top] = key ;
      top ++ ;
    }
    else {
      window.alert("overflow")
      return "overflow" ;
    }
  } 
  this.pop = function () {
    if (top != 0) {
      top -= 1 ;
      return stack[top] ;
    }
    else {
      return "underflow" ;
    }
  }
  this.getLength =  function() {
    return stack.length ;
  }
  this.getTop = function () {
    if (top != 0) {
      return stack[top-1] ;
    }
    else {
      return "underflow" ;
    }
  }
}

function lineEquation () {
  var size = 50 ;
  var stack = [] ;
  var top = 0 ;
  this.push = function (key) {
    if (top != size) {
      stack[top] = key ;
      top ++ ;
    }
    else {
      window.alert("overflow")
      return "overflow" ;
    }
  } 
  
  this.pop = function () {
    const inputButtons = new inputButtonList() ;
    let str = ""
    //window.alert(inputButtons.getInputButtonViaId(stack[top-1]).getType()) ;
    //window.alert(stack[top]) ;
    if (top >= 2 && stack[top-1] == "(" &&  (inputButtons.getInputButtonViaId(stack[top-2]).getType() == "unary" || stack[top-2] == "^") && stack[top-2] != "(") {
      top -= 2 ;
      str += stack[top+1] ;
      str += stack[top] ;
      
      stack[top+1] = null ;
      stack[top] =  null ;
    }
    else if (top != 0) {
      top -- ; 
      str += stack[top] ;
      
      stack[top] =  null ;
    }
    else {
      //window.alert("underflow")
       str = "underflow" ;
    } 
    return str ;
  }
  
  this.count = function(id) {
    let counter = 0 ;
    for (let i = 0 ; i<= top-1 ; i++) {
      if (id == stack[i]) {
        counter++ ;
      }
    }
    return counter ;
  }
  this.graphValidation = function() {
   let valid  = true ;
    console.log("kasdka:" +  inputButtons.getInputButtonViaId(stack[top-1]) instanceof inputButtonOperand) ;
   if (this.count("(")  != this.count(")")) {
     valid = false ;
   }
   else if (isNaN(stack[top-1]) && stack[top-1] != ")"&& !(inputButtons.getInputButtonViaId(stack[top-1]) instanceof inputButtonOperand)) {
     valid = false ;
   } 
  return valid ;
  }
  this.precedence = function(symbol) {
    //check for unary operator using inputbutton list 
    let inputButtons = new inputButtonList() ;
    let temp = inputButtons.getInputButtonViaId(symbol) ;
    if (temp instanceof inputButtonOperator && temp.getType() == "unary") {
      return 6 ;
    }
    switch (symbol) {
      case "-" :
        return 1 ;
      case "+" :
        return 2 ;
      case "*" :
        return 3 ;
      case "/" :
        return 4 ;
      case "^" :
        return 5 ;
      default:
        return - 1 ;
    }
  }
  this.associativity = function(symbol) {
    let inputButtons = new inputButtonList() ;
    let temp = inputButtons.getInputButtonViaId(symbol) ;
    if (temp.getId() == "^" || (temp instanceof inputButtonOperator && temp.getType() == "unary")) {
      return "right" ;
    }
    else if (temp instanceof inputButtonOperator && temp.getType() == "binary") {
      return "left" ;
    }
    else {
      window.alert("invalid symbol") ;
      return "invalid" ;
    }
  }
  this.convInfixToPostfix = function() {
    var postfix = [] ;
    const symbolStack = new memoryStack() ; // for operators
    const inputbuttons = new inputButtonList() ;
    const equation = [...stack] // copy of stack not by refrence
    for (let i = 0 ; i <=equation.length -1 ; i++) {
      //console.log("i:"+ i) ;
      var currSym = equation[i] ;
      //console.log("CurrSym:" + currSym) ;
      var currSymObj = inputbuttons.getInputButtonViaId(currSym) ;
      //console.log(currSymObj instanceof inputButtonOperand) ;
      if (currSymObj.getId() == "num") {
        let num = currSym ;
        postfix.push(num) ;
      }
      else if (currSymObj instanceof inputButtonOperand) {
        postfix.push(currSym) ;
      }
      else if (currSym == "(") {
        //console.log("bracket found and then added to postfix") ;
        symbolStack.push(currSym) ;
        //console.log("stack top:" + symbolStack.getTop()) ;
      }
      else if (currSym == ")") {
        let x = postfix.length ;
        while ( symbolStack.getTop() != "(") {
          let y = symbolStack.pop() ;
          //console.log(y) ;
          postfix[x] = y ;
          x++ ;
          //console.log("x var:" , + x) ;
        }
        symbolStack.pop() ; 

      } 
      else if (currSymObj instanceof inputButtonOperator && currSym != ")") {
        //console.log("is operator!") ;
        //console.log("symbolStacktop:" + symbolStack.getTop()) ;
        while (symbolStack.getTop() != "(" && symbolStack.getTop() != "underflow" && (this.associativity(currSym) == "left" && this.precedence(symbolStack.getTop()) > this.precedence(currSym) || this.associativity(currSym) == "right" && this.precedence(symbolStack.getTop()) > this.precedence(currSym))) {
          postfix.push(symbolStack.pop()) ;
        }
      symbolStack.push(currSym) ; // push operator to top of stack
      }
    }
    
     //console.log("symbolStacktop: after operator added" + symbolStack.getTop()) ;
    //console.log("symbolStackLength:" + symbolStack.getLength()) ;

    
    var temp = symbolStack.pop() ;
    console.log("temp:" + temp) ;
    while (temp != "underflow")  { // stack may still have some operators 
      postfix.push(temp) ;
      temp = symbolStack.pop() ;
    }
    
    
    for (let i = 0 ; i <= postfix.length ; i++) {
      console.log("postfix"+ i + postfix[i]) ;
    }
    //window.alert(postfix) ;
    return postfix ;
  }
  this.evalEq = function(expression ,x) { // x is type Number 
    // assumes equation is valid
    var postfix = expression ;
    //window.alert(postfix) ;
    var operandStack = new memoryStack() ;
    var inputBtns  = new inputButtonList() ;
    let i = 0 ;
    while (typeof postfix[i] != "undefined") {
      //console.log("postfix" + postfix[i]) ;
      let currBtn = inputBtns.getInputButtonViaId(postfix[i]) ;
      if ( currBtn instanceof inputButtonOperand) {
        let pushed = Number(postfix[i]) ;
        if (postfix[i] == "x") {
          pushed = x ; // if x thenm add curr x val
          //window.alert("x found and set to" + pushed) ;
        }
        else if (isNaN(postfix[i])) {
          //window.alert("constant found") ;
          pushed = currBtn.getValue() ; // if constant (e.Pi,etc) add constant
          //window.alert(pushed) ;
        }
        operandStack.push(pushed) ; // if  just number then add number
      }
        
      else if (currBtn instanceof inputButtonOperator && currBtn.getType() == "unary"){ // don't have to check for brackets since postfix cannot have brackets
        operandStack.push(currBtn.eval(operandStack.pop())) ; // evaluate top of stack operand with operator and then push back to the stack
      }
      else {
        //window.alert("Binary operation") ;
        //console.log(currBtn) ;
        let a = operandStack.pop()
        let b =operandStack.pop()
        operandStack.push(currBtn.eval(a,b)) ; // evalaute the operator with the top 2 items in the stack and then push back
      }
      i++ ;
    }
    //window.alert("EVAL:" + operandStack.getTop())
    return operandStack.getTop() ; // the final value in stack will be the number
  }
  
  this.display = function () { // only for testing
    for (let i = 0 ; i < top ; i++) {
      console.log(stack[i]) ;
    }
  }
  this.validate = function(inputBtnObj , equObj) {
    //console.log("validating...") ;
    console.log(top) ;
    var isValid  = false ;
    console.log(inputBtnObj) ;
    var inpBtnId = inputBtnObj.getId() ;
    console.log(top) ;
    const inputButtons = new inputButtonList() ;
    var lastType = "" ;
    if (top != 0) {
      //console.log("stack[top]"+stack[top-1]) ;
      if (!(isNaN(stack[top-1]))) {
        lastButtonObj = inputButtons.getInputButtonViaId("num") ;
      }
      else {
         var lastButtonObj = inputButtons.getInputButtonViaId(stack[top-1])
      }
      console.log(lastButtonObj) ;
      var lastId = lastButtonObj.getId();
      console.log(lastId) ;
      if (lastButtonObj  instanceof inputButtonOperand) {
        lastType = "operand" ;
      }
      else if ( lastId == "(") {
        lastType = "(" ;
      }
        else if ( lastId == ")") {
          lastType = ")" ;
        }

      else if (lastButtonObj instanceof inputButtonOperator) {
        lastType = "operator" ; 
        // type for last item must be binary since the last item must be an open bracket if the item is unary operator
      }
    }

    //validation
    if (inpBtnId == "("){ //follow comments above for order
       // open bracket validation
      if ((lastType != "operand" && lastType != ")") || top == 0) {
        isValid = true ; 
      } 
      else {
        window.alert("an open bracket can not be entered after an operand or closed bracket") ;
      }
    }  
    else if (inpBtnId == ")") {
      //closed bracket validation
      let counter1 = this.count("(") ;
      let counter2 = this.count(")") ;
      if ((lastType == "operand" || lastType == ")")  && top != 0 && (counter1 > counter2)) {
        isValid = true ; 
      } 
      else {
        window.alert("a closed bracket can only be entered after an operand and needs to be at the end or inside an open bracket clause") ;
      }
    }

    else if (inputBtnObj instanceof inputButtonOperand) { 
     // operand validation
    // check for value and num ID
      console.log("lastType:" + lastType) ;

      if (lastType == "operator" || lastType == "(" || top ==0) {
        isValid = true ;
      }
      else {
        window.alert("You can only enter an operand after an open bracket or operator or at the start") ;
      }
    }
    
    else if (inputBtnObj instanceof inputButtonOperator && inputBtnObj.getType() == "binary") { 
      // binary operator validation
      if (lastType != "(" && top != 0 && lastType != "operator") {
        isValid = true ;
      }
      else {
        window.alert("you cannot enter a binary operator after an open bracket or binary operator  or at the start")
      }
    }
    else if (inputBtnObj instanceof inputButtonOperator && inputBtnObj.getType() == "unary") { // unary operator validation
      if ((lastType != "operand" && lastType != ")") || top == 0 ) {
        isValid = true ;
      }
      else {
        window.alert("you cannot have a unary operator after an operand or closed bracket") ;
      }
    }

    //placing symbol into display and the line if valid
    var value = 0 ;
    if (inpBtnId == "num" && isValid == true) {
      value = inputBtnObj.setValue() ; // prompting user for input 
      //console.log("Value:"+ value) ;
    }
    
    if (isValid != true) {
       window.alert("invalid") ;
    } 
    else if (value == null) { // pressed cancel button when entering a value for num
      window.alert("input Cancelled");
    }
    else if (!(top < size -1)) {
      window.alert("max length of equation reached") ;
    }
    else {
      //window.alert(inputBtnObj.getDisplay()) ;
      //console.log(equObj) ;
      if (inpBtnId == "num") {
        console.log(value) ;
        this.push(value) ;
      }
      else  {
        this.push(inputBtnObj.getId()) ;
      }
      equObj.innerHTML =  equObj.innerHTML + inputBtnObj.getDisplay() ;
      
      if ((inputBtnObj instanceof inputButtonOperator && inputBtnObj.getType() == "unary" && inpBtnId != "(" && inpBtnId != ")")) {
        window.alert("bracket added") ;
        this.push("(") ;
        equObj.innerHTML =  equObj.innerHTML + "(" ;
      }    
    } 
  }
}

function lineList () {
  var currentLine = 0 ; // index of currently selected line by user
  var list = [] ;
  var length = 0 ;
  this.addLine = function () {
    if (length != 8) { // overflowcheck
      let newLine  = new line() ;
      list[length] = newLine ;
      length++ ;
      return true ;
    }
    else {
      window.alert("max number of lines reached: 8") ;
      return false ;
    }
  }
  this.removeLine = function (index) { 
    // used later for the delete key in stage 3
    if (currentLine == index) { // also prevents removing all lines (underflow)
        window.alert("Cannot remove line that is currently selected. Select a differrent line to delete this line") ;
      return false ;
    }
    else {
      for (let i = index ; i < length-1 ; i++) {
        list[i] = list[i+1] ; //shifts all lines left 1 index that are after the deleted line
      }
      length-- ;
    }
    if (currentLine > index) { // since all lines after the deleted line get shifted left, if CurrentLine is one of those lines then the index will be differrent
      currentLine -- ; 
    }
    return true ;
  }
  this.getLine = function() {
    return list[currentLine] ;
  }
  this.getLineViaIndex = function (index) {
    if (index >= 0 && index < length){
       return list[index] ;
    }
    else {
      return "out of range" ;
    }
  }
  this.setLine = function(val) {
     // used for lineNumber buttons that first appear in stage 2
    // note that currentLine also gets changed in delete line in some cases since the index of the line changes
    currentLine = val ;
  }
  this.display = function () { // only for testing
    for (let i = 0 ; i < length ; i++) {
      console.log(list[i]) ;
      console.log("current color var:"+(list[i].getColour())) ;
      //console.log("gradient var:"+(list[i].getGradientGraph()));
      //console.log("isGraphed var:"+(list[i].getGraph())) ;
    }
    console.log(currentLine) ;
  } 
  this.getEquObj = function () {
    return document.getElementById("lines").rows[currentLine].children[1] ;
  }
}


function line () {
  var colour = "#AAAAAA" ;
  var equation = new lineEquation () ;
  var isGraphed = false ;
  var isGradientGraphed = false ; 
  
  
  this.getColour = function() {
    return colour ;
  }
  this.setColour = function() {
   
    // No.colours = max number of lines = 8 
    let colours = ["#AAAAAA","#0000FF", "#FF0000", "#008000", "#FFFF00", "#FFC0CB","#800080","#FFA500"] ; 
    //cycle: white blue red green yellow pink purple orange 
    let x = 0 ;
    while (colours[x] != colour) { // linear search
      x++ ;
    }
    if (x+1 != colours.length) {
      colour = colours[x+1] ;
    }
    else {
      colour = colours[0] ;
    }
    return colour
  }
  
  this.getGraph = function() {
    return isGraphed ;
  }
  this.setGraph = function() {
    isGraphed = !isGraphed ;
  }
  this.getGradientGraph = function() {
    return isGradientGraphed ;
  }
   this.setGradientGraph = function() {
    isGradientGraphed = !isGradientGraphed ;
  }
  this.getEquation = function() {
    return equation ;
  }
}

function cycle (e) {
  const binaryTable = document.getElementById("binaryOperatorTable") ;
  const operandsTable = document.getElementById("operandTable") ;
  const unaryTable = document.getElementById("unaryOperatorTable") ;
  if (e.target.id == "binaryOperator") {
      binaryTable.style.display = "table" ;
      operandsTable.style.display = "none" ;
      unaryTable.style.display = "none" ;
  }
  else if (e.target.id == "operand") {
    operandsTable.style.display = "table" ;
    binaryTable.style.display = "none" ;
    unaryTable.style.display = "none" ;
  }
  else if (e.target.id =="unaryOperator") {
    unaryTable.style.display = "table" ; 
    binaryTable.style.display = "none" ;
    operandsTable.style.display = "none" ;
    }
}
function graph (id) {
  var scale = 1 ;
  var height = 0 ;
  var width = 0 ;
  var lastXpoint = 0 ;// change to negative width
  var lastYpoint = 0 ;// change to negative height
  var canvas = document.getElementById(id) ;
  var ctx = canvas.getContext("2d") ;
  var xIncrement = 0.1// subject to change
  var minZoom = 10 * xIncrement // subject to change
  var maxZoom = 1000000 // subject to change
  var scale = 1 ;
  var validPoint = true ;
  
  
  this.setHeight = function(val) {
    //height = document.getElementById("domainInp").value ; // Number
    height = val ;
    canvas.height = height ;
  }
  this.setWidth = function(val) {
    //width = document.getElementById("domainInp").value ; // Number
    width = val ;
    canvas.width = width ;
    // do i need to do ctx.translate again here? 
    //probably?
    //test soon
  }
  this.setColour = function (colour) {
    ctx.strokeStyle = colour;  
  }
  this.drawLineToPoint = function (yVal) {
    if (yVal < canvas.height/(2*scale) && yVal > -canvas.height/(2*scale) && validPoint == true) {
      ctx.beginPath() ;
      ctx.moveTo(lastXpoint, -lastYpoint) ;
      lastXpoint += xIncrement/scale ;
      lastYpoint = yVal ;
      //console.log("xdrawto:"+lastXpoint) ;
      //console.log("ydrawto"+lastYpoint) ;
      ctx.lineTo(lastXpoint, -lastYpoint) ; // y values are negative because graph for y cords are opposite 
      ctx.stroke() ;
    }
    else if (yVal < canvas.height/(2*scale) && yVal > -canvas.height/(2*scale) && validPoint == false) {
      ctx.beginPath() ;

      lastXpoint += xIncrement/scale ;
      lastYpoint = yVal ;
      ctx.moveTo(lastXpoint, -lastYpoint) ;

      //console.log("xdrawto:"+lastXpoint) ;
      //console.log("ydrawto"+lastYpoint) ;

      ctx.stroke() ;
      validPoint = true ;

      }
    else {
      validPoint = false 
      lastXpoint += xIncrement/scale ;
      lastYpoint = yVal ;
      ctx.beginPath() ;
      ctx.moveTo(lastXpoint, -lastYpoint) ;
    }
   
  }
  this.axis = function () {
    //console.log("drawing") ;
    canvas.width = canvas.width // clearing the canvas
    ctx.translate(canvas.width/2, canvas.height/2) //  good
    ctx.scale(scale,scale) ;
    lastXpoint = -canvas.width/(2*scale)
    lastYpoint = 0 ;
    //console.log("width:"+ canvas.width) ;
    //console.log("height:"+canvas.height) ;
    console.log(canvas.style.height) ;
    console.log(canvas.style.height) ;
  
    ctx.beginPath() ;
    ctx.strokeStyle = "black" ; 
    ctx.moveTo(0,0) ;
    ctx.lineTo(0,-(canvas.height/2)) ;
    ctx.moveTo(0,0) ;
    ctx.lineTo(0,(canvas.height/2)) ;
    ctx.moveTo(0,0) ;
    ctx.lineTo(canvas.width/(2),0) ;
    ctx.moveTo(0,0) ;
    ctx.lineTo(-canvas.width/(2),0) ;
    ctx.moveTo(-canvas.width/(2),0) ;
    ctx.stroke() ;
    //window.alert("axis") ;
  }
  this.setZoom = function (val) {
    canvas.width = canvas.width // clearing the canvas
    ctx.translate(canvas.width/2, canvas.height/2) //  good
    if (scale + val < 0.2){
      window.alert("scale too large") ;
    }
    else {
      document.getElementById("domainInp").innerHTML = "XY Domain(+-):" + canvas.width/2/scale**2;
      scale += val
      //ctx.scale(scale,scale) ; // scaling canvas
      this.axis() ;
    }
    
    this.drawGraph(lines) ; // stage 6
  }
  this.drawGraph = function(lineList) {
    this.axis()  ;
    lastXpoint = -canvas.width ;
    lastYpoint = 0 ;
    this.axis()  ;
    let currLineIndex = 0 ;
    while (lineList.getLineViaIndex(currLineIndex) != "out of range") {
      //window.alert(currLineIndex) ;
      var currLine = lineList.getLineViaIndex(currLineIndex) ;
      var currEq = currLine.getEquation() ;
      currEq.display() ;
      //window.alert(currLine.getGraph()) ;
      //window.alert(currEq.graphValidation()) ;
      if (currLine.getGraph() && currEq.graphValidation()) {
        this.setColour(currLine.getColour()) ;
        let postfixExpression = currEq.convInfixToPostfix()
        for (let i = -canvas.width/2/scale; i < canvas.width/2 ; i+=xIncrement/scale) {
            let y = currEq.evalEq(postfixExpression ,i/scale) ;
            //console.log("i/scale:" + i/scale)
          if (i == -canvas.width/2/scale) { // makes sure first point is moved to but no line is drawn
            lastXpoint += xIncrement/scale ;
            lastYpoint = y*scale ;
            ctx.moveTo(lastXpoint ,lastYpoint) ;
          }
            this.drawLineToPoint(y*scale) ;
        }
      }
    currLineIndex++ ;
    }
  }
  this.getIncrement = function() {
    return xIncrement ;
  }
  this.resetZoom = function() {
    canvas.width = canvas.width
    ctx.translate(canvas.width/2, canvas.height/2) ;
    //ctx.scale(1/scale,1/scale) ;
    scale = 1 ;
    this.axis() ;
    document.getElementById("domainInp").innerHTML = "XY Domain(+-):" + canvas.width/(2/(scale**2)) ;
    //drawGraph()
  }
}

function input (e) {
    lines.getLine().getEquation().validate(inputButtons.getInputButtonViaId(e.target.id),lines.getEquObj()) ;
}
/* ----------- SOME EVENT HANDLERS ------------ */

function lineNumber (e) {
  //console.log("hello") ;
  //console.log(e.target.innerHTML) ;
  let linesTable = document.getElementById("lines") ;
  let length = linesTable.rows.length ;
  //console.log(length) ;
  //console.log(linesTable.rows[0].children[0].children[0].innerHTML) ;
  let newLineNumber = -1 ;
  for (let i = 0 ; i < length; i++) {
    if (e.target.innerHTML == linesTable.rows[i].children[0].children[0].innerHTML) { 
      newLineNumber = i  ;
      linesTable.rows[i].children[0].children[0].style.backgroundColor = "white" ;
    }
    else {
      linesTable.rows[i].children[0].children[0].style.backgroundColor = "grey";
    }
  }
  //console.log("lineNumber:" + newLineNumber) ;
  lines.setLine(newLineNumber) ;
  lines.display() ;
  let expression = lines.getLine().getEquation().convInfixToPostfix()
  window.alert(expression) ;
  window.alert(lines.getLine().getEquation().evalEq(expression,4500)) ;
}

function CycleColour(e) {
  
  //console.log("line index:") ;
  //console.log(e.target.parentElement.parentElement.rowIndex) ; 
  let lineIndex = e.target.parentElement.parentElement.rowIndex ;
  let line = lines.getLineViaIndex(lineIndex)  
  line.setColour() ;
  e.target.style.backgroundColor = line.getColour() ;  
}
function changeGraphedState(e) {
  let lineIndex = e.target.parentElement.parentElement.rowIndex ;
  let line = lines.getLineViaIndex(lineIndex) ;  
  line.setGraph() ;
  //console.log(line.getGraph()) ;
  if (line.getGraph()) {
     e.target.innerHTML = "YES" ;
  }
  else {
     e.target.innerHTML = "NO" ;
  }
}
function changeGradientState(e) {
  let lineIndex = e.target.parentElement.parentElement.rowIndex ;
  let line = lines.getLineViaIndex(lineIndex)  ;
  line.setGradientGraph() ;
  if (line.getGradientGraph()) {
     e.target.style.textDecoration = "none" ;
  }
  else {
     e.target.style.textDecoration = "line-through" ;
  }
}

function backspace(e) {
  const lineIndex = e.target.parentElement.parentElement.rowIndex ; // the row that the button is in 
  //console.log(lineIndex) ;
  const line = lines.getLineViaIndex(lineIndex) ;  
  var display = e.target.parentElement.parentElement.children[1].innerHTML ;
  //console.log(display) ;
  var buttonList =  new inputButtonList() ;
  var popped = line.getEquation().pop() // stack updated
  window.alert("popped" + popped) ;
  poppedList = popped.split("") ;
  if (popped == "underflow") {
    window.alert("equation is empty") ;
  }
  else  if (poppedList[0] == "(" && poppedList.length > 1) { // if last thing was a bracket then also remove the unary operator if there is one before it 
    var temp = popped.replace("(","")
    var poppedButton = buttonList.getInputButtonViaId(temp) ;
    var poppedDisplay = poppedButton.getDisplay() ;
    popped = poppedDisplay + "("  ;
  }
  else {
    //window.alert(popped) ;
    var poppedButton = buttonList.getInputButtonViaId(popped) ;
    if (!isNaN(popped)) { // removing lsat number if it is a number
      let displayList = display.split("") ;
      let count = 0 ;
      for (let i = display.length-1 ; i >= 0 ; i--) {
        if (displayList[i] == "-") {
          count++ ;
          break ;
        } 
        else if (displayList[i] == ".") {
          count++ ;
        }
        else if (isNaN(displayList[i])) {
          break ;
        }
        else {
          count++ ;
        }  
      }
      displayList = displayList.slice(displayList.length - count,displayList.length) ;
      //console.log(displayList) ;
      //console.log("Count:" + count) ;
      popped = displayList.join("") ; 
      //console.log("POPPED:"+ popped) ;
    }
    else {
      var poppedDisplay = poppedButton.getDisplay() ;
      popped = poppedDisplay ;
    }
  }
  console.log("Popped value:" + popped) ;
  //console.log("pop return" + popped) ;
  // if we reverse both the substring and the orginal string the String.replace() method will remove the last occurrence of that substring in the orignal string if we then reverse the orignal string after
  temp = display.split("").reverse().join("") // reversed string
  popped = popped.split("").reverse().join("") ; // reversed substring
  temp = temp.replace(popped, "") // Rempove reversed string from reversed display
  let newDisplay = temp.split("").reverse().join("") ; // changing back string to original way round
  //console.log(newDisplay) ;
  e.target.parentElement.parentElement.children[1].innerHTML= newDisplay ;
  
}
function delLine (e) {
  let lineIndex = e.target.parentElement.parentElement.rowIndex ;
  let line = lines.getLineViaIndex(lineIndex) ;  
  if (lines.removeLine(lineIndex) ==  false) { // global store of lines .addline() creates and adds a new line
    return false ;
  }
  else {
    e.target.parentElement.parentElement.parentElement.deleteRow(lineIndex) ;
  }
  
}
function insert () {
  if (lines.addLine() ==  false) { // global store of lines .addline() creates and adds a new line
    return false ;
  }
  else {
    let lineTable = document.getElementById("lines") ;
    let Nrows = lineTable.rows.length ;
    var num = 0 ;
    if (Nrows == 0) {
      num = 0 ;
    }
    else {
       num = parseInt(lineTable.rows[Nrows-1].children[0].children[0].innerHTML) ;
    }
    let lastRow  = lineTable.insertRow(Nrows) ; // insertRow returns the new row object
    var attributeButtons = [
    ["lineNumber", (num+1).toString()  , lineNumber],
    ["colour","Colour" , CycleColour],
    ["gradient" , "G" , changeGradientState],
    ["graphed" , "NO" , changeGraphedState],
    ["backspace" , "<-" , backspace],
    ["delete" , "DEL" , delLine]];
    
    for (let i = 0 ; i <= attributeButtons.length-1 ; i++) {
       lastRow.insertCell(i) ;
      lastRow.children[i].classList.add("equation") ;
      
      let btn = document.createElement("button") ;
      btn.addEventListener("click" , attributeButtons[i][2]) ;
      btn.classList.class = attributeButtons[i][0] ;
      btn.innerHTML = attributeButtons[i][1] ;
      lastRow.children[i].appendChild(btn) ;
      if (i==1) { // equation display
        lastRow.insertCell(i) ;
        lastRow.children[i].classList.add("equation") ;
        lastRow.children[i].innerHTML = "Equation:" ;
      }
      else if (i==2) { // set up for new gradient button
        lastRow.children[i].children[0].style.textDecoration = "line-through" ;
      }
    }
    if (Nrows == 0) { // line number for line 1
        lastRow.children[0].children[0].style.backgroundColor = "white" ;
    }
    else { // line number default for every other line
      lastRow.children[0].children[0].style.backgroundColor = "grey" ;
    }
  }  
}
function preventFloats (e) {
    if (e.keyCode == 190) { // keycode for .
      window.alert("value must be a positive integer") ;
      event.preventDefault() ; // deprecated
    }
  }
function preventStrings (e) {
  if (e.keyCode == 189 || e.keyCode == 69 || e.keyCode == 187) {// prevents - , e , +
    window.alert("value must be a positive integer") ;
    event.preventDefault() ;// deprecated 
  }
}
function MaxDomain (e) {
  console.log(e.target) ;
  let currNum = (e.target.value+ e.key) ;
  let upperLimit = parseInt(e.target.max) ;
  //window.alert(upperLimit) ;
  //window.alert(currNum) ;
  if (currNum > upperLimit) {// upperLimit
    window.alert("upper limit reached")
    event.preventDefault() ;// deprecated 
  } 
}
window.onload = jsOnload ;
function jsOnload () {
   document.getElementById("graph").onwheel = function() { return false ;}
   const cycleButtons = document.getElementsByClassName("cycleButton") ;
  for (let i =0 ; i < cycleButtons.length ; i++) {
      cycleButtons[i].addEventListener("click" , cycle) ;
  }  
  const inputButtonIds = document.getElementsByClassName("inputButton") ;
  for (let i =0 ; i < inputButtonIds.length ; i++) {
      inputButtonIds[i].addEventListener("click" , input) ;
  }  
  const lineNumberButtons = document.getElementsByClassName("lineNumber") ;
  for (let i =0 ; i < lineNumberButtons.length ; i++) {
      lineNumberButtons[i].addEventListener("click" , lineNumber) ;
  }  
  const insertBtn = document.getElementById("insert") ;
  insertBtn.addEventListener("click" , insert) ;
  insert() ;
  const xDomainBtn = document.getElementById("domainInp") ;
  //xDomainBtn.addEventListener("keydown", preventStrings) ;
  //xDomainBtn.addEventListener("keydown", preventFloats) ;
  //xDomainBtn.addEventListener("keydown", MaxDomain) ;

  
  const canvasGraph = new graph("graph") ;

  document.getElementById("graph").addEventListener("click" , () => { 
    //console.log("scaled") ;
    canvasGraph.axis() ;
    canvasGraph.setZoom(50) ;
    canvasGraph.drawLineToPoint(10) ;
  }) ;
  document.addEventListener("wheel" , (e) => {
    let scale = 0 ;
    const deltaY = e.deltaY
    //console.log("Wheel event occurred")
    //console.log(deltaY) ;
    var inbounds = false ;
    if (deltaY > 0)  {
      scale = -0.2 ;
      inbounds = true ;
    }
    else if (deltaY < 0) { // zoom out 
      scale = 0.2 ;
      inbounds = true ;
    }
    //console.log(inbounds) ;
    if (inbounds) {
      canvasGraph.axis() ;
      canvasGraph.setZoom(scale)
    
      //console.log(scale) ;
      //e.stopPropagation() ;
    }
  }) ;
  document.getElementById("home").addEventListener("click" , (e) =>{
    canvasGraph.resetZoom() ;
    canvasGraph.drawGraph(lines)
  });
   document.getElementById("calc").addEventListener("click" , (e) =>{
     canvasGraph.drawGraph(lines) ;
   });
  canvasGraph.setHeight(3000) ;
  canvasGraph.setWidth(3000) ;
  canvasGraph.axis() ;
  //canvasGraph.setColour("#FF7766") ;
  //canvasGraph.drawLineToPoint(200) ;
  //canvasGraph.drawLineToPoint(-1000) ;
  //canvasGraph.drawLineToPoint(200) ;
}
const lines = new lineList () ;
const inputButtons = new inputButtonList() ;

lines.setLine(0) ;



