
function LineEquation () {
  var size = 10 ;
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
  this.display = function () {
    for (let i = 0 ; i <= top ; i++) {
      console.log(stack[i]) ;
    }
  } 
}
  const testEquation = new LineEquation() ;
  testEquation.push("hello") ;
  testEquation.push("yes") ;
  testEquation.pop() ;
  testEquation.push("why") ;
  testEquation.display() 
  console.log(testEquation.top) ;

function lineList () {
  var currentLine = 0 ;
  var list = [] ;
  this.addline = function (newLine) {
    list[index] = newLine ;
  }
  this.removeline = function (index) {
  }
}