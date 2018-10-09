<template>
  <div>
    <transition-group class="wrapper" name="slide-fade">
      <div v-for="notification of notifications" :key="notification.id" class="notificationBox">
        <div class="image">
          <font-awesome-icon icon="info-circle" size="4x"></font-awesome-icon>
        </div>
        <div class="title">
          {{ notification.title }}
        </div>
        <div class="content" v-html="notification.content">
          Otwórz swój ekwipunek za pomocą przycisku
          <b>I</b>, aby go użeyć.
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "notificationComponent",
  data() {
    return {
      notifications: []
    };
  },
  methods: {
    showNotification(title, content, type, timeout) {
      let id = this.notifications.length * Math.random() * 100; // this should generate random key to track for v-key directive. Unfourtanely, v-key don't work as expected if provided array's index
      this.notifications.unshift({
        id,
        title,
        content
      });
      setTimeout(() => {
        this.notifications.pop();
      }, timeout);
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 100%;
  justify-content: flex-end;
  flex-direction: row;
  width: auto;
}
.notificationBox {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding: 10px;
  height: 5rem;
  width: 100%;
  border-radius: 3px;
  .image {
    float: left;
    padding: 10px 10px 10px 10px;
    color: rgba(255, 255, 255, 0.6);
  }
  .title {
    float: left;
    margin-top: 10px;
    width: 80%;
    font-weight: 600;
  }
  .content {
    float: left;
    width: 80%;
    padding-bottom: 10px;
  }
}
</style>
