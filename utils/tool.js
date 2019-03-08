const getTouchData = (endX, endY, startX, startY) => {
  console.log(endX, endY, startX, startY)
  let turn = "";
  if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
    turn = "right";
  } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
    turn = "left";
  }
  return turn;
};

const getTouchcolum = (endX, endY, startX, startY) => {
  console.log(endX, endY, startX, startY)
  let turn = "";
  if (endY - startY > 50 && Math.abs(endX - startX) < 50) {      //右滑
    turn = "down";
  } else if (endY - startY < -50 && Math.abs(endX - startX) < 50) {   //左滑
    turn = "up";
  }
  return turn;
};

module.exports = {
  getTouchData: getTouchData,
  getTouchcolum: getTouchcolum
}