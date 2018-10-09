'use strict';

const drawRaycastForPoliceRadar = vehicle => {
  const position = vehicle.position;
  const direction = vehicle.getForwardVector();
  const farAway = new mp.Vector3((direction.x * 40) + position.x, (direction.y * 40) + position.y, (direction.z * 40) + position.z);
  const targetVehicle = mp.raycasting.testPointToPoint(vehicle.position, farAway, 2);

  if (targetVehicle) {
    return targetVehicle;
  }

  return false;
};

exports.drawRaycastForPoliceRadar = drawRaycastForPoliceRadar;
