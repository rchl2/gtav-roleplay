<template>
  <div class="container-xl flex flex-row h-screen max-h-screen flex-grow overflow-hidden">
    <div class="w-24 border-sidebar flex p-2">
      <div class="flex-1 self-end text-center h-24 pt-5">
        <a class="icon-color mx-auto" href="#"><font-awesome-icon icon="power-off" size="4x"></font-awesome-icon></a>
      </div>
    </div>
    <div class="flex flex-grow flex-col w-full">
      <div style="padding-right: 50px;" class="max-w-lg">
        <navbar :active.sync="active" :disabled="disabled"></navbar>
      </div>
      <div class="flex flex-row h-full justify-center items-center font-sans">
        <div :is="view" ref="currentView" v-bind="props"></div>
      </div>
    </div>
    <transition name="fade">
      <alert-box :messages.sync="alerts"></alert-box>
    </transition>
  </div>
</template>

<script>
import "../../assets/scss/style.scss"
import "../../assets/scss/transitions.scss"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Navbar from "./components/Navbar.vue";
import AlertBox from "./components/AlertBox.vue";

export default {
  name: "loginParent",
  data() {
    return {
      view: 'home',
      active: 'home',
      disabled: ['webpage', 'friends', 'chars', 'settings'],
      alerts: {
        type: '',
        count: 0,
        message: ''
      },
      allowedAfterLogin: ['chars'],
      characters: []
    };
  },
  computed: {
    props () {
      if(this.view === 'chars') return { characters: this.characters }
      return {};
    }
  },
  watch: {
    active (newValue, oldValue) {
      if(newValue === null) return false;
      this.view = newValue;
      console.log(newValue)
      document.body.style.background = `url(../assets/${this.view}.jpg) center`;
    }
  },
  methods: {
    handleResponse(response) {
      if(response.errors) {
        this.alerts.count++
        this.alerts.type = 'error'
        this.alerts.message = response.message || "Dane logowania są nieprawidłowe"
        return true;
      }
      if(response.characters) {
        this.characters = response.characters
        this.active = 'chars'
        this.disabled = this.disabled.filter((x) => !this.allowedAfterLogin.includes(x))
        this.pushInformation('Aby wybrać postać skorzystaj ze strzałek na klawiaturze!')
        return true;
      }
      return false;
    },
    pushInformation(message) {
      this.alerts.type = 'info';
      this.alerts.message = message;
    }
  },
  components: {
    FontAwesomeIcon,
    Navbar,
    'home': () => import('./components/LoginForm.vue'),
    'chars': () => import('./components/CharacterSelect.vue'),
    AlertBox,
  },
  mounted() {
    this.handleResponse({"characters":[{"id":1,"name":"Verona Gorczany DVM","owner":1,"age":61551,"sex":1,"money":24905,"position":"{\"x\":1815.94775390625,\"y\":-1137.275390625,\"z\":81.94310760498047}","dimension":0,"lastLogin":"2018-10-12T17:54:33.000Z","lastVehicle":null,"lastExitType":"disconnect","createdAt":"2018-06-01T00:30:40.000Z","updatedAt":"2018-10-12T20:41:14.000Z"},
    {"id":1,"name":"Twoja Stara Pijana","owner":1,"age":61551,"sex":1,"money":24905,"position":"{\"x\":1815.94775390625,\"y\":-1137.275390625,\"z\":81.94310760498047}","dimension":0,"lastLogin":"2018-10-12T17:54:33.000Z","lastVehicle":null,"lastExitType":"disconnect","createdAt":"2018-06-01T00:30:40.000Z","updatedAt":"2018-10-12T20:41:14.000Z"}]});
  }
}
</script>

<style lang="scss">
html, body {
  user-select: none; 
  transition: background .5s linear;
  background-size: cover;
  background: url('../../assets/images/home.jpg') center;
}
.alert-box {
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
}
</style>
