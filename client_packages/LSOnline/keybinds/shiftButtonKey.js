'use strict';

mp.keys.bind(0x10, false, () => {
  if (!mp.gui.cursor.visible) {
    mp.events.callRemote('shiftButtonKey');
  }
});
