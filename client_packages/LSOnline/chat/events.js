'use strict';

const globals = require('./LSOnline/util/globals');

mp.events.add({
  clearChat: () => clearGameChat(),
  toggleChat: value => toggleChat(value),
  disableChat: value => disableChat(value)
});

const clearGameChat = () => mp.gui.execute('$("#chat_messages").html("")');
exports.clearGameChat = clearGameChat;

const toggleChat = value => {
  globals.toggleChat = value;
  mp.gui.chat.show(value);
};

exports.toggleChat = toggleChat;

const disableChat = value => {
  globals.disableChat = value;
  mp.gui.chat.activate(value);
};

exports.disableChat = disableChat;
