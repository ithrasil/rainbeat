module.exports = { 
  
  assignCardId: function(direction, songs, cardId) {
    
    const length = songs.length-1;

    if(direction == "next"){
      if(cardId == length){
        cardId = 0;
      }
      else {
        cardId++;
      }
    }
    else if(direction == "prev"){
      if(cardId == 0){
        cardId = length;
      }
      else {
        cardId--;
      }
    }
    
    return cardId;
    
  },
  
  resizeArtwork: function(url, size) {
    const beginning = url.lastIndexOf('-');
    const end = url.lastIndexOf('.');

    const newUrl = url.substr(0, beginning + 1) + "t" + size + "x" + size + url.substr(end, url.length);

    return newUrl;
  },
  
  createStream: function(stream_url, client_id) {
    const song = new Audio(stream_url + "?client_id=" + client_id);

    return song;
  },
  
  convertSecondsToMs: function(d) {
    let m = Math.floor(d / 60);
    let s = Math.floor(d % 60);
    return ((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
  }
  
}

