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
}
 

function lineList () {
  var currentLine = 0 ; // index of currently selected line by user
  var list = [] ;
  var length = 0 ;
  
  this.addLine = function () {
    if (length != 8) { // overflowcheck
      let newLine  = new line() ;
      list[length] = newLine ;
      length++
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
      length--
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
    return colour
  }
  this.setColour = function() {
   
    // No.colours = max number of lines = 8 
    let colours = ["#FFFFFF", ,"#0000FF", ,"#FF0000", ,"#008000", ,"#FFFF00", "#FFC0CB","#800080","#FFA500"] ; //cycle: white blue red green yellow pink purple orange 
    let newColourIndex = 0 ;
    let x = 0 ;
    while (colours[newColourIndex] != colours[x]) { // linear search
      x++ ;
    }
    newColourIndex ++ ;
    if (newColourIndex != colours.length) {
      colour = colours[newColourIndex] ;
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
    isGraidentGraphed = !isGradientGraphed ;
  }
  this.getEquation = function() {
    return equation ;
  }
}


function stage1Testing () {
  const testLineList = new lineList() 
  testLineList.addLine() ; // each line gets it's lineEquation stored in the attribute "equation" when instantiated
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  testLineList.addLine() ;
  const testLine1 = testLineList.getLine() // line in index 0
  const testEquation1 = testLine1.getEquation() // equation of line in index 0

  //test 1
  testLineList.addLine() ; // hopefully not allowed since max No. of lines is 8

  //test2 
  console.log(testLine1.getColour()) ;
  console.log(testLine1.setColour()) ;
  console.log(testLine1.getColour()) ;


  //test3 
  console.log(testLine1.getGraph()) ;
  console.log(testLine1.setGraph()) ;
  console.log(testLine1.getGraph()) ;

  console.log(testLine1.getGradientGraph()) ;
  console.log(testLine1.setGradientGraph()) ;
  console.log(testLine1.getGradientGraph()) ;

  //test 4 and 5
  //test 4 and 5 are ommitted since I chose to not use parameters and as shown in the second mistake outline in the iterative testing

  //test 6
  testEquation1.push("a") ;
  testEquation1.push("b") ;
  testEquation1.push("c") ;
  testEquation1.push("d") ;
  testEquation1.push("e") ;
  testEquation1.pop() ;
  testEquation1.pop() ;
  testEquation1.display() ;

  //test 7 
  testEquation1.pop() ;
  for (let i = 0 ; i<= 100 ; i++) {
       testEquation1.push(i.toString()) ;
  }
  

}
//testLineList.display() ;

  //testEquation.display() ;
  //console.log(testEquation.top) ;
stage1Testing() ;
