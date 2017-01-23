module.exports = { 
  
  setScope(max, index) {
    
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
    const volume = localStorage.getItem('volume') / 100;
    song.preload = "metadata";
    song.volume = volume !== false ? volume : 0.50;

    return song;
  },
  
  convertSecondsToMs: function(d) {
    let m = Math.floor(d / 60);
    let s = Math.floor(d % 60);
    return ((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s);
  }
  
}

