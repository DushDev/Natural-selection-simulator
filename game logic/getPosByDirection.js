export default function getPosByDirection(direction) {
  let pos = { x: 0, y: 0 };
  switch (direction) {
    case 0:
      pos.x++;
      break;
    case 1:
      pos.x++;
      pos.y++;
      break;
    case 2:
      pos.y++;
      break;
    case 3:
      pos.x--;
      pos.y++;
      break;
    case 4:
      pos.x--;
      break;
    case 5:
      pos.x--;
      pos.y--;
      break;
    case 6:
      pos.y--;
      break;
    case 7:
      pos.x++;
      pos.y--;
    default:
      break;
  }
  return pos;
}
