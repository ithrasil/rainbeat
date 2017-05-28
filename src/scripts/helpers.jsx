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
  
  setScope: function(max, index) {
    
    let limit = max > 5 ? 5 : max;
    
    if(max % 2 == 0 && max != 0) {
      limit -= 1;
    }
    else if(max==0) {
      return [0, 0];
    }
    
    const middle = typeof index ? index+1 : Math.ceil(max / 2);
    
    const leftRange = middle-Math.floor(limit/2) - 1;
    const rightRange = middle+Math.floor(limit/2);
    
    return [leftRange, rightRange];
    
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

