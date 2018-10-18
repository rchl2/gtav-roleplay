<template>
  <div class="flex mt-32 pt-32 flex-row flex-1 w-full h-full">
    <div class="w-1/5 h-64 flex items-end justify-center" v-if="characters" >
      <a class="icon-color"><font-awesome-icon icon="chevron-left" size="9x" @click="previous"></font-awesome-icon></a>
    </div>
    <div class="flex flex-wrap flex w-full justify-around font-sans">
      <div class="w-2/5 h-16 md:hidden lg:block">
        <img src="https://via.placeholder.com/256x512">
      </div>
      <div class="w-auto mt-32">
        <h1 class="text-white font-normal">{{ selection.name }}</h1>
        <table class="text-white mt-6 font-sans leading-normal text-base">
          <tr class="border-b-2 border-t-2 border-table">
            <td style="width: 12rem;" class="uppercase">Wiek:</td>
            <td class="text-right">{{ selection.age }}</td>
          </tr>
          <tr class="border-b-2 border-t-2 border-table">
            <td style="width: 12rem;" class="uppercase">Płeć:</td>
            <td class="text-right">{{ selection.sex === 1 ? 'Mężczyzna' : 'Kobieta' }}</td>
          </tr>
          <tr class="border-b-2 border-t border-table">
            <td style="width: 12rem;" class="uppercase">Przegrany czas:</td>
            <td class="text-right">{{ getPlayed() }}</td>
          </tr>
          <tr class="border-b-2 border-t-2 border-table">
            <td style="width: 12rem;" class="uppercase">Ostatnio w grze:</td>
            <td class="text-right">{{ getTime() }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="flex flex-row w-full flex-wrap content-center">
      <div class="flex flex-row items-center justify-between flex-nowrap text-xl w-full h-16">
        <div class="uppercase font-sans text-center">
          <h2 class="font-thin text-grey-light">Zdrowie</h2>
          <p class="text-white">{{ selection.health }}%</p>
        </div>
        <div class="uppercase font-sans text-center">
          <h2 class="font-thin text-grey-light">Gotówka</h2>
          <p class="text-white">${{ selection.money.toLocaleString('en-US') }}</p>
        </div>
        <div class="uppercase font-sans text-center">
          <h2 class="font-thin text-grey-light">W banku</h2>
          <p class="text-white">${{ selection.money.toLocaleString('en-US') }}</p>
        </div>
      </div>
      <div class="flex flex-row justify-center flex-wrap content-center flex-1 pb-8">
        <div class="box flex-none items-center justify-between flex flex-col h-auto w-2/5">
          <span class="font-sans text-white">Grupy</span>
          <font-awesome-icon class="text-white m-2" icon="users" size="5x"></font-awesome-icon>
          <span class="text-white">1</span>
        </div>
        <div class="box flex-none items-center justify-between flex flex-col h-auto w-2/5">
          <span class="font-sans text-white">Pojazdy</span>
          <font-awesome-icon class="text-white m-2" icon="car" size="5x"></font-awesome-icon>
          <span class="text-white">1</span>
        </div>
        <div class="box flex-none items-center justify-between flex flex-col h-auto w-2/5">
          <span class="font-sans text-white">Przedmioty</span>
          <font-awesome-icon class="text-white m-2" icon="shopping-bag" size="5x"></font-awesome-icon>
          <span class="text-white">1</span>
        </div>
        <div class="box flex-none items-center justify-between flex flex-col h-auto w-2/5">
          <span class="font-sans text-white">Osiągnięcia</span>
          <font-awesome-icon class="text-white m-2" icon="trophy" size="5x"></font-awesome-icon>
          <span class="text-white">1</span>
        </div>
      </div>
    </div>
    <div class="w-1/5 h-64 flex items-end justify-center">
      <a class="icon-color"><font-awesome-icon icon="chevron-right" size="9x" @click="next"></font-awesome-icon></a>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from 'moment';


export default {
  
  name: "CharSelectParent",
  props: {
    characters: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    selection () {
      return this.characters[this.index] || {}
    }
  },
  methods: {
    previous() {
      if(this.index - 1 < 0) return this.index = this.characters.length-1;
      return this.index--;
    },
    next() {
      if(this.index + 1 > this.characters.length) return this.index = 0;
      return this.index++;
    },
    getTime() {
      const last = moment(this.selection.lastLogin)
      const now = moment(new Date)
      const diff = moment.duration(last.diff(now), "millisecond").locale('pl').humanize(true);
      return diff;
    },
    getPlayed() {
      let miliseconds = moment.duration(this.selection.played)
      let hours = miliseconds.asHours().toFixed(0);
      let minutes = moment.duration(miliseconds-hours*3600000).asMinutes().toFixed(0);

      return `${hours}h ${minutes}m`
    },
    selectedCharacter(id) {
      mp.trigger('characterSelected', id)
    }
  },
  components: {
    FontAwesomeIcon
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if(e.keyCode === 37) return this.previous();
      if(e.keyCode === 39) return this.next();
      if(e.keyCode === 13) return this.selectedCharacter(this.selection.id);
    })
  }
}
</script>

<style lang="scss">
.box {
  background: rgba(0, 0, 0, .3);
  margin: 1rem;
  padding: 1.5rem;
  box-sizing:border-box;
}
</style>