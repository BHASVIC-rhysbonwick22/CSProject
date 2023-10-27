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
      window.alert("Overflow error") ;
    }
  } 
  this.pop = function () {
    if (top != 0) {
      top -- ;
      return stack[top] ;
    }
    else {
      window.alert("underflow error")
    }
  } 
  this.display = function () { // only for testing
    for (let i = 0 ; i < top ; i++) {
      console.log(stack[i]) ;
    }
  } 
  this.validate = function(inputBtnObj) {
    console.log("validating...") ;
    // follow flowchart 
    //valifaet
    //use the previous item in the stack 
    //use the inputbutton nlist in line list
    //add to stack if the item is valid
    //update the display with the display
    //create event listeners for all inoput buttons and make the specifc buttons differrent
    //create the table tht the line is placved in and a change line number button XD
    //stage 2 pretty much done
    //finsih the mistakes on the documentation and add test table and results too
  }
}
 

function lineList () {
  var currentLine = 0 ; // index of currently selected line by user
  var list = [] ;
  var length = 0 ;
  //stage 2 input buttons below
  // operators - display,id/key,type
  // operands - display,id/key,value
  const numObj = new inputButtonOperand("0","num","0") // needs to be updated
  numObj.setValue = function (inpValue) {
    if (typeof(inpValue) != "number" && typeof(inpValue) != "float") {
      window.alert("value must be a number or float") ;
    }
    else if (10**-6 > tinpValue || inpValue > 10**6) {
      window.alert("value must be between 10^-6 and 10^6") ;
    }
    else {
      this.value = inpValue ;
      this.display = toString(inpvalue) ;
    }
  }

  const logaObj = new inputButtonOperator("logₐ","lg","0") // needs to be updated
  logaObj.setValue = function (inpValue) {
    if (typeof(inpValue) != "number" && typeof(inpValue) != "float") {
      window.alert("value must be a number or float") ;
    }
    else if (10**-2 > inpValue || inpValue > 10**6) {
      window.alert("value must be between 10^-2 and 10^6") ;
    }
    else {
      this.value = inpValue ;
    }
  }
  
  var inputButtonList = [ 
    //unary
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
    logaObj, // important changes needed 29 unary
    //binary
    new inputButtonOperator("x","*","binary") ,
    new inputButtonOperator("+","+","binary") ,
    new inputButtonOperator("-","-","binary") ,
    new inputButtonOperator("/","/","binary") ,
    new inputButtonOperator("^","^","binary") , // requires brackets after it to make sure user understands when the exponentaion ends
    // if I have time, the document could change from superscript to subscript when this is entered but brackerts would still be required or something
   //operands
    new inputButtonOperand("π","p",toString(Math.PI)) ,
    new inputButtonOperand("e","e",toString(Math.E)) ,
    new inputButtonOperand("𝑥","x","x") ,
    numObj // needs to be updated
  ] ;
  
  this.getinputButton = function(id) {
    let x = 0 ;
    console.log(inputButtonList.length) ; 
    while (id != inputButtonList[x].getId() && x < inputButtonList.length -1 ) {
      console.log(x) ;
      x++ ;
    }
    console.log(inputButtonList[x]) ;
    if (id == inputButtonList[x].getId() ) {
      return inputButtonList[x] ;
    }
    else {
      console.log("not in list") ;
      return -1 ;
    }
  }
  
  this.addLine = function () {
    if (length != 8) { // overflowcheck
      let newLine  = new line() ;
      list[length] = newLine ;
      length++ ;
    }
    else {
      window.alert("max number of lines reached: 8") ;
    }
  }
  this.removeLine = function (index) { 
    // used later for the delete key in stage 3
    if (currentLine == index) { // also prevents removing all lines (underflow)
        window.alert("Cannot remove line that is currently selected. Select a differrent line to delete this line") ;
    }
    else {
      for (let i = index ; i < length-1 ; i++) {
        list[i] = list[i+1] ; //shifts all lines left 1 index that are after the deleted line
      }
      length-- ;
    }
    
    if (currentLine > index) { // since all lines after the deleted line get shifted left, if CurrentLine is one of theose lines then the index will be differrent
      currentLine -- ; 
    }
  }
  this.getLine = function() {
    return list[currentLine] ;
  }
  this.setLine = function(val) {
    // used for lineNumber buttons that first appear in stage 2
    // note that currentLine also gets changed in delete line in some cases since the index of the line changes
    currentLine = val ;
  }
  this.display = function () { // only for testing
    for (let i = 0 ; i < length ; i++) {
      console.log(list[i]) ;
    }
    console.log(currentLine) ;
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
  /*testEquation1.pop() ;
  for (let i = 0 ; i<= 20 ; i++) {
       testEquation1.push(i.toString()) ; // 0,1,2,3...19 and then 20 is ignored due to overflow 
  */
  //} 
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
Object.assign(inputButtonOperator.prototype, new inputButtonPrototype()) ;
Object.assign(inputButtonOperand.prototype, new inputButtonPrototype()) ;
const testbtn = new inputButtonOperator("*", "x","binary") ;
console.log(testbtn.getId()) ;
console.log(testbtn.getDisplay()) ;
const testList = new lineList() ;
const btn = testList.getinputButton("num") ;






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


window.onload = jsOnload ;
function jsOnload () {
   const cycleButtons = document.getElementsByClassName("cycleButton") ;
  for (let i =0 ; i < cycleButtons.length ; i++) {
      cycleButtons[i].addEventListener("click" , cycle) ;
  }  
  const lineist = new lineList() ;
}
