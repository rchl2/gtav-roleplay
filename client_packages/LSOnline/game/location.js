'use strict';

// Author of this resource: rootcause
const natives = {
  IS_RADAR_HIDDEN: '0x7382a6b79bd5f585',
  IS_RADAR_ENABLED: '0x8056602005161037'
};

// Misc
const { getMinimapAnchor, draw3dText } = require('./LSOnline/util/misc');

// Settings for speedometer
const useSpeedo = true;
const updateInterval = 500; // milliseconds, lower value = more accurate, at the cost of performance

// Minimap, speedo config
let streetName = null;
let zoneName = null;
let isMetric = false;
let minimap = {};

setInterval(() => {
  if (mp.game.invoke(natives.IS_RADAR_ENABLED) && !mp.game.invoke(natives.IS_RADAR_HIDDEN)) {
    const position = mp.players.local.position;
    let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);

    isMetric = mp.game.gameplay.getProfileSetting(227) === 1;
    minimap = getMinimapAnchor();

    zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
    streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
    if (getStreet.crossingRoad && getStreet.crossingRoad !== getStreet.streetName) streetName += ` / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;
  } else {
    streetName = null;
    zoneName = null;
  }
}, updateInterval);

mp.events.add(
  {
    render: () => {
      if (streetName && zoneName) {
        draw3dText(streetName, [minimap.rightX + 0.01, minimap.bottomY - 0.065], 4, [255, 255, 255, 255], 0.55);
        draw3dText(zoneName, [minimap.rightX + 0.01, minimap.bottomY - 0.035], 4, [255, 255, 255, 255], 0.5);

        let vehicle = mp.players.local.vehicle;
        if (useSpeedo && vehicle) draw3dText(`${(vehicle.getSpeed() * (isMetric ? 3.6 : 2.236936)).toFixed(0)} ${(isMetric) ? 'KM/H' : 'MPH'}`, [minimap.rightX - 0.003, minimap.bottomY - 0.0485], 4, [255, 255, 255, 255], 0.45, true);
      }
    }
  }
);
