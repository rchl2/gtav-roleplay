// Animations
const crouchingClipSetSwitchTime = 0.25;
const crouchingMovementClipSet = 'move_ped_crouched';
const { loadClipSet } = require('./LSOnline/util/misc');
const crouchingStrafeClipSet = 'move_ped_crouched_strafing';

// load clip sets
loadClipSet(crouchingMovementClipSet);
loadClipSet(crouchingStrafeClipSet);

mp.events.add({
  entityStreamIn: entity => {
    if (entity.type !== 'player') {
      return false;
    }

    if (typeof entity.getVariable('isCrouching') !== 'undefined') {
      entity.setMovementClipset(crouchingMovementClipSet, crouchingClipSetSwitchTime);
      entity.setStrafeClipset(crouchingStrafeClipSet);
    }
  },

  entityDataChange: (entity, key, value) => {
    if (entity.type !== 'player' || key !== 'isCrouching') {
      return false;
    }

    if (value) {
      entity.setMovementClipset(crouchingMovementClipSet, crouchingClipSetSwitchTime);
      entity.setStrafeClipset(crouchingStrafeClipSet);
    } else {
      entity.resetMovementClipset(crouchingClipSetSwitchTime);
      entity.resetStrafeClipset();
    }
  }
});

// CTRL key to toggle crouching
mp.keys.bind(0x11, false, () => mp.events.callRemote('toggleCrouch'));
