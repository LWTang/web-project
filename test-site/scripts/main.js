var myImage = document.querySelector('img');

myImage.onclick = function() {
  var mySrc = myImage.getAttribute('src');
  if(mySrc === 'images/favicon.ico'){
    myImage.setAttribute('src', 'images/touxiang.jpg');
  }
  else {
    myImage.setAttribute('src', 'images/favicon.ico');
  }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.textContent = 'esting is cool, ' + myName;
}

if(!localStorage.getItem('name')) {
  setUserName();
}
else {
  var storedName = localStorage.getItem('name');
  myHeading.textContent = 'esing is cool, ' + storedName;
}

myButton.onclick = function() {
  setUserName();
}