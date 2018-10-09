'use strict';

mp.keys.bind(0x26, false, () => {
  if (!mp.gui.cursor.visible) {
    mp.events.callRemote('keyArrowUp');
  }
});
