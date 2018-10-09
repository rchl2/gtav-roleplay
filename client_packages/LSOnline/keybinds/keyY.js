'use strict';

mp.keys.bind(0x59, false, () => {
  if (!mp.gui.cursor.visible) {
    mp.events.callRemote('keyY');
  }
});
