'use strict';

mp.keys.bind(0x28, false, () => {
  if (!mp.gui.cursor.visible) {
    mp.events.callRemote('keyArrowDown');
  }
});
