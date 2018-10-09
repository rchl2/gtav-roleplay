"use strict";

let camera = null;
let defaultEaseTime = 20000000000000000000000000;

function createCamera (x, y, z, rx, ry, rz, viewangle) {
  camera = mp.cameras.new("Cam", {x: x, y: y, z: z}, {x: rx, y: ry, z: rz}, viewangle);
  camera.setActive(true);
  mp.game.cam.renderScriptCams(true, true, defaultEaseTime, false, false);
}

exports.createCamera = createCamera;

function destroyCamera () {
  if (!camera) return;
  camera.setActive(false);
  mp.game.cam.renderScriptCams(false, true, 0, true, true);
  camera.destroy();
  camera = null;
}

exports.destroyCamera = destroyCamera;

mp.events.add(
  {
    "cameraDestroyed": () => {
      destroyCamera();
    }
  }
);
