<template>
<div class="navbar font-sans my-8 ml-8 w-auto">
  <ul class="list-reset flex text-3xl" @click="handleNavigation">
    <li class="mr-6" :class="[active === 'home' ? 'active' : null, disabled.includes('home') ? 'cursor-not-allowed' : null]">
      <a class="text-grey border-none" route="home">Główna</a>
    </li>
    <li class="mr-6" :class="[active === 'webpage' ? 'active' : null, disabled.includes('webpage') ? 'cursor-not-allowed' : null]">
      <a class="text-grey border-none" route="webpage">Forum</a>
    </li>
    <li class="mr-6" :class="[active === 'chars' ? 'active' : null, disabled.includes('chars') ? 'cursor-not-allowed' : null]">
      <a class="text-grey border-none" route="chars">Postacie</a>
    </li>
    <li class="mr-6" :class="[active === 'friends' ? 'active' : null, disabled.includes('friends') ? 'cursor-not-allowed' : null]">
      <a class="text-grey border-none" route="friends">Znajomi</a>
    </li>
    <li class="mr-6" :class="[active === 'settings' ? 'active' : null, disabled.includes('settings') ? 'cursor-not-allowed' : null]">
      <a class="text-grey border-none" route="settings">Opcje</a>
    </li>
  </ul>
</div>
</template>

<script>


export default {
  name: "NavbarParent",
  props: {
    active: {
      type: String,
      default: 'home'
    },
    disabled: {
      type: Array,
      default: () => ['webpage', 'friends', 'chars', 'settings']
    }
  },
  data() {
    return {}
  },
  methods: {
    handleNavigation(event) {
      let route = event.target.getAttribute('route');
      event.preventDefault();

      if(this.disabled.includes(route)) {
        return false;
      }
      this.$emit('update:active', route)
    }
  }
}
</script>

<style>
</style>