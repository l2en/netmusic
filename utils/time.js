const timeFormat =(time)=>{
  let min = parseInt(parseInt(time) / 60)
  let sec = parseInt(time) % 60;
  if(String(sec).length == 1){
    sec = '0'+sec 
  }
  return min + ':' + sec
}

module.exports = {
  timeFormat: timeFormat
}