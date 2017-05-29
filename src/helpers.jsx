module.exports = { 
  
  assignCard: function(direction, cardsList, oldActiveCard) {
    let newActiveCard;

    if(typeof direction == "object") {
      newActiveCard = direction.target.parentNode;
    }
    else if(direction == "next"){
      newActiveCard = oldActiveCard.nextSibling;
      
      if(newActiveCard.classList.contains('dummy')){
        newActiveCard = cardsList[2];
      }
    }
    else if(direction == "prev"){
      newActiveCard = oldActiveCard.previousSibling;
      
      if(newActiveCard.classList.contains('dummy')){
        const length = cardsList.length;
        newActiveCard = cardsList[length-3];
      }
    }
    
    return newActiveCard;
    
  },
  
  resizeArtwork: function(url, size) {
    const beginning = url.lastIndexOf('-');
    const end = url.lastIndexOf('.');

    const newUrl = url.substr(0, beginning + 1) + "t" + size + "x" + size + url.substr(end, url.length);

    return newUrl;
  },
  
  createStream: function(stream_url, client_id) {
    let song = new Audio(stream_url + "?client_id=" + client_id);
    song.preload = "metadata";

    return song;
  },
  
  convertSecondsToMs: function(d) {
    let m = Math.floor(d / 60);
    let s = Math.floor(d % 60);
    return ((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
  }
  
}

