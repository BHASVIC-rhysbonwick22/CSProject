function lineEquation () {
  var size = 20 ;
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
    if (top != 0 && stack[top-1] == "(" &&  (inputButtons.getInputButtonViaId(stack[top-2]).getType() == "unary" || stack[top-2] == "^") && stack[top-2] != "(") {
       top -= 2 ;
      str += stack[top+1] ;
      str += stack[top] ;
     
    }
    
    else if (top != 0) {
      top -- ;
      str += stack[top] ;
    }
    
    else {
      //window.alert("underflow")
       str = "underflow" ;
    }
    return str ;
  }
  this.count = function(id) {
    let counter = 0 ;
    for (let i = 0 ; i<= top ; i++) {
      if (id == stack[i]) {
        counter++ ;
      }
    }
    return counter ;
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

    var inpBtnId = inputBtnObj.getId() ;
    console.log(top) ;
    const inputButtons = new inputButtonList() ;
    var lastType = "" ;
    if (top != 0) {
      //console.log("stack[top]"+stack[top-1]) ;
      var lastButtonObj = inputButtons.getInputButtonViaId(stack[top-1])
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
      if ((lastType == "operand" || lastType == ")") && lastType != "(" && top != 0 && (counter1 > counter2)) {
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
      if (lastType != "operand" || top == 0 ) {
        isValid = true ;
      }
      else {
        window.alert("you cannot have a unary operator after an operand") ;
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
      this.push(inputBtnObj.getId())
      equObj.innerHTML =  equObj.innerHTML + inputBtnObj.getDisplay() ;
      
      if ((inputBtnObj instanceof inputButtonOperator && inputBtnObj.getType() == "unary" && inpBtnId != "(" && inpBtnId != ")" )|| inpBtnId == "^") {
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
     return list[index] ;
  }
  this.setLine = function(val) {
     // used for lineNumber buttons that first appear in stage 2
    // note that currentLine also gets changed in delete line in some cases since the index of the line changes
    currentLine = val ;
  }
  this.display = function () { // only for testing
    for (let i = 0 ; i < length ; i++) {
      console.log(list[i]) ;
      console.log(list[i].getColour()) ;
    }
    console.log(currentLine) ;
  } 
  this.getEquObj = function () {
    return document.getElementById("lines").rows[currentLine].children[1] ;
  }
}


function line () {
  var colour = "#FFFFFF" ;
  var equation = new lineEquation () ;
  var isGraphed = false ;
  var isGradientGraphed = false ; 
  
  
  this.getColour = function() {
    return colour ;
  }
  this.setColour = function() {
   
    // No.colours = max number of lines = 8 
    let colours = ["#FFFFFF","#0000FF", "#FF0000", "#008000", "#FFFF00", "#FFC0CB","#800080","#FFA500"] ; 
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
function stage1Testing () {
  // each test should be run seperate from eachother and each test should use the testLineList and their contents if needed

  const testLineList = new lineList() ;
  testLineList.addLine() ; // each line gets it's lineEquation stored in the attribute "equation" when instantiated
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  const testLine1 = testLineList.getLine() ; // line in index 0
  const testEquation1 = testLine1.getEquation() ; // equation of line in index 0

  //test 1
  testLineList.addLine() ; // hopefully not allowed since max No. of lines is 8
  //works - alert is shown 

  //test2 
  console.log(testLine1.getColour()) ; // colours[0] == "#FFFFFF" - default 
  testLine1.setColour()
  console.log(testLine1.getColour()) ; // colours[1] == "#FFFF00"
  for (let i = 1 ; i <= 7 ; i++){
    testLine1.setColour() ;
  }
  console.log(testLine1.getColour()) ;
  //works apart from syntax error in array (accidentally too many commas from copy paste)

  //test3 
  console.log(testLine1.getGraph()) ; // false - default 
  testLine1.setGraph() ;
  console.log(testLine1.getGraph()) ; // true 

  console.log(testLine1.getGradientGraph()) ; // false - default
  testLine1.setGradientGraph() ;
  console.log(testLine1.getGradientGraph()) ; // true 
  // works - had a syntax error of misspelling gradient
  // code was making a new variable rather than updating the existing attribute 

  //test 4 and 5 are ommitted since I chose to not use parameters and as shown in the second mistake outlined in the iterative testing

  //test 6
  testEquation1.push("a") ;
  testEquation1.push("b") ;
  testEquation1.push("c") ;
  testEquation1.push("d") ;
  testEquation1.push("e") ;
  testEquation1.pop() ; // d
  testEquation1.pop() ; // e
  testEquation1.display() ; // ["a" ,"b" , "c"]
  // works perfect - correct values are popped and correct values are displayed in the correct order! 

  //test 7 
  testEquation1.pop() ;
  for (let i = 0 ; i<= 20 ; i++) {
       testEquation1.push(i.toString()) ; // 0,1,2,3...19 and then 20 is ignored due to overflow 
  
  } 
  testEquation1.display() ;
  // works - underflow is prevented and all pushes are made except the last one which would cause an overflow
  
}
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
    new inputButtonOperator("(","(","unary") ,
    new inputButtonOperator(")",")","unary") ,
    new inputButtonOperator("sin","sin","unary") ,
    new inputButtonOperator("cos","cos","unary"),
    new inputButtonOperator("tan","tan","unary"),
    new inputButtonOperator("sec","sec","unary"),
    new inputButtonOperator("cosec","csc","unary"),
    new inputButtonOperator("cot","cot","unary"),
    new inputButtonOperator("arctan","atan","unary"),
    new inputButtonOperator("arcsin","asin","unary"),
    new inputButtonOperator("arccos","acos","unary"),
    new inputButtonOperator("arctan","atan","unary"),
    new inputButtonOperator("arcsec","asec","unary"),
    new inputButtonOperator("arccosec","acsc","unary"),
    new inputButtonOperator("arccot","acot","unary"),
    new inputButtonOperator("ln","le","unary"),
    new inputButtonOperator("Modulus","m","unary"),
    new inputButtonOperator("floor","f","unary"),
    new inputButtonOperator("celing","c","unary"),
    new inputButtonOperator("sinh","sinh","unary"),
    new inputButtonOperator("cosh","cosh","unary"),
    new inputButtonOperator("tanh","tanh","unary"),
    new inputButtonOperator("sech","sech","unary"),
    new inputButtonOperator("cosech","csch","unary"),
    new inputButtonOperator("coth","coth","unary"),
    new inputButtonOperator("arsinh","asinh","unary"),
    new inputButtonOperator("arcosh","acosh","unary"),
    new inputButtonOperator("artanh","atanh","unary"),
    new inputButtonOperator("arsech","asech","unary"),
    new inputButtonOperator("arcosech","acsch","unary"),
    //binary
    new inputButtonOperator("x","*","binary") ,
    new inputButtonOperator("+","+","binary") ,
    new inputButtonOperator("-","-","binary") ,
    new inputButtonOperator("/","/","binary") ,
    new inputButtonOperator("^","^","binary") , 
    // requires brackets after it to make sure user understands when the exponentaion ends
   //operands
    new inputButtonOperand("π","p",toString(Math.PI)) ,
    new inputButtonOperand("e","e",toString(Math.E)) ,
    new inputButtonOperand("𝑥","x","x") ,
    numObj 
  ] ;

  this.getInputButtonViaId = function(id) {
    let x = 0 ;
    //console.log(inputButtonList.length) ; 
    while (id != inputButtonList[x].getId() && x < inputButtonList.length -1 ) {
      //console.log(x) ;
      x++ ;
    }
    //console.log(inputButtonList[x]) ;
    if (id == inputButtonList[x].getId() ) {
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
//testing stuff

//const testbtn = new inputButtonOperator("*", "x","binary") ;
//console.log(testbtn.getId()) ;
//console.log(testbtn.getDisplay()) ;
//const testInputList = new inputButtonList() ;
//const btn = testInputList.getInputButtonViaId("num") ;


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
  console.log("lineNumber:" + newLineNumber) ;
  lines.setLine(newLineNumber) ;
  lines.display() ;
}

function CycleColour(e) {
  
  console.log("line index:") ;
  console.log(e.target.parentElement.parentElement.rowIndex) ; // this should be fine -  needs to be tested with the functioanality of the delete line method
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
    console.log(e.target) ;
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
  console.log(lineIndex) ;
  const line = lines.getLineViaIndex(lineIndex) ;  
  var display = e.target.parentElement.parentElement.children[1].innerHTML ;
  console.log(display) ;
  const buttonList =  new inputButtonList() ;
  var popped = line.getEquation().pop() // stack updated
  
  if (popped == "underflow") {
    window.alert("equation is empty") ;
  }
  else  if (popped.split("")[0] == "(" && popped.split("").length > 1) { // if last thing was a bracket then also remove the unary operator if there is one before it 
    var temp = popped.replace("(","")
    var poppedButton = buttonList.getInputButtonViaId(temp) ;
    var poppedDisplay = poppedButton.getDisplay() ;
    popped = poppedDisplay + "("  ;
  }
  else {
    window.alert(popped) ;
    var poppedButton = buttonList.getInputButtonViaId(popped) ;
    if (popped == "num") { // removing lat number if value is a number
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
      console.log("POPPED:"+ popped) ;
    }
    else {
      var poppedDisplay = poppedButton.getDisplay() ;
      popped = poppedDisplay ;
    }
  }
  //console.log("pop return" + popped) ;
  // if we reverse both the substring and the orginal string the replace function will remove the last occurrence of that substring in the orignal string if we then reverse the orignal string after
  temp = display.split("").reverse().join("") // reversed string
  popped = popped.split("").reverse().join("") ; // reversed string
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
       num = lineTable.rows[Nrows-1].children[0].innerHTML ;
    }
    // UPDATE THIS
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

window.onload = jsOnload ;
function jsOnload () {
   const cycleButtons = document.getElementsByClassName("cycleButton") ;
  for (let i =0 ; i < cycleButtons.length ; i++) {
      cycleButtons[i].addEventListener("click" , cycle) ;
  }  
  const inputButtons = document.getElementsByClassName("inputButton") ;
  for (let i =0 ; i < inputButtons.length ; i++) {
      inputButtons[i].addEventListener("click" , input) ;
  }  
  const lineNumberButtons = document.getElementsByClassName("lineNumber") ;
  for (let i =0 ; i < lineNumberButtons.length ; i++) {
      lineNumberButtons[i].addEventListener("click" , lineNumber) ;
  }  
  const insertBtn = document.getElementById("insert") ;
  insertBtn.addEventListener("click" , insert) ;
  insert() ;
}
const lines = new lineList () ;
const inputButtons = new inputButtonList() ;

lines.setLine(0) ;


