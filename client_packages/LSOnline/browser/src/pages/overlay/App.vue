<template>
  <notification ref="notifications" class="notification"></notification>
</template>

<script>
import Notification from "./components/Notification.vue";

export default {
  name: "overlayParent",
  data() {
    return {};
  },
  components: {
    Notification
  }
};
</script>

<style lang="scss">
@import "../../assets/scss/transitions.scss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");
html,
body {
  overflow: hidden;
}
.notification {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 30%;
}
</style>
