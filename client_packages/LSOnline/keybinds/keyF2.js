'use strict';

const globals = require('./LSOnline/util/globals');

mp.keys.bind(0x71, false, () => {
  mp.gui.cursor.visible
    ? setCursorVisible(false)
    : setCursorVisible(true);
});

const setCursorVisible = (value) => {
  mp.gui.cursor.visible = value;
  value ? mp.gui.cursor.show(true, true) : mp.gui.cursor.show(false, false);
};
