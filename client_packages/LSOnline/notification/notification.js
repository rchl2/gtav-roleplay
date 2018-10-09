const Overlay = require('./LSOnline/util/overlay');

mp.events.add('actionDone', (title, content, timeout = 3500) => Overlay.notify(title, content, 'info', timeout));
