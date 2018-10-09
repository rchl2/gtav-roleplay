'use strict';

mp.keys.bind(0x5A, false, () => {
  if (!mp.gui.cursor.visible) {
    mp.events.callRemote('keyZ');
  }
});
