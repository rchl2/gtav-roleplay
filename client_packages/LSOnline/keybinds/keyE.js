'use strict';

mp.keys.bind(0x45, false, () => {
  if (!mp.gui.cursor.visible) {
    mp.events.callRemote('keyE');
  }
});
