const keyPress = function() {
  const songInput = document.querySelector('#songInput');

  if(event.keyCode == 32 && document.activeElement != songInput){
    this.handlePlaySwitch();
  }
}

export { keyPress };