'use strict';

// Update interval = more accurate, at the cost of performance
const updateInterval = 2000;
const date = new Date();

setInterval(() => mp.game.time.setClockTime(date.getHours(), date.getMinutes(), date.getSeconds()), updateInterval);
