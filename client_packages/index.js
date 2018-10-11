// Chat
require('./LSOnline/chat/events');

// Authorization
require('./LSOnline/login/login');

// CEF
require('./LSOnline/api/browser');
require('./LSOnline/browser/events/browserEvents');
require('./LSOnline/util/overlay');
require('./LSOnline/notification/notification');

// Environment
require('./LSOnline/environment/time');

// Player
require('./LSOnline/player/playerEvents');
require('./LSOnline/player/playerRender');

// Vehicles
require('./LSOnline/vehicle/vehicleRender');
require('./LSOnline/vehicle/vehicleEvents');

// Keybinds
require('./LSOnline/keybinds/keyZ');
require('./LSOnline/keybinds/keyY');
require('./LSOnline/keybinds/keyE');
require('./LSOnline/keybinds/keyF2');
require('./LSOnline/keybinds/keyArrowUp');
require('./LSOnline/keybinds/keyLeftCtrl');
require('./LSOnline/keybinds/keyArrowDown');
require('./LSOnline/keybinds/shiftButtonKey');

// Customs
require('./LSOnline/game/location');
const { prepareClientView } = require('./LSOnline/util/misc');

mp.events.add({
  clientLaunched: () => prepareClientView(),
  render: () => mp.game.player.setHealthRechargeMultiplier(0.0)
});

mp.events.call('clientLaunched');
