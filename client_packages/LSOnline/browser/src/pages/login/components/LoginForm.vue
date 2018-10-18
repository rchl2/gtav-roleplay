<template>
        <div class="flex flex-row bg-white-trans shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 max-w-lg w-auto">
          <div class="lg:w-3/5 md:w-full">
            <form class="w-auto mt-8 text-white">
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label class="block text-white uppercase md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Login:
                  </label>
                </div>
                <div class="md:w-3/5">
                  <input class="bg-black opacity-75 appearance-none border-2 rounded w-full py-2 px-4 text-grey-lightest leading-tight outline-none border-none" id="inline-full-name" v-model="username" @input="disabled = false" type="text"></input>
                </div>
              </div>
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label class="block text-white uppercase md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                    Hasło:
                  </label>
                </div>
                <div class="md:w-3/5">
                  <input autocomplete="off" class="bg-black opacity-75 appearance-none border-2 rounded w-full py-2 px-4 text-grey-lightest leading-tight outline-none border-none" id="inline-password" v-model="password" @input="disabled = false" type="password">
                </div>
              </div>
              <div class="flex mt-16 flex-row flex-wrap items-start justify-around">
                <label class="block text-grey font-sans font-bold">
                  <input class="mr-2 pt-1 leading-tight" type="checkbox">
                  <span class="text-sm text-white">
                    Zapamiętaj mnie
                  </span>
                </label>
                <button style="height: 2rem; " :class="{ 'cursor-not-allowed' : disabled, 'opacity-50' : disabled }" class="bg-white uppercase hover:bg-white-dark text-black font-bold py-1 px-2" type="submit" :disabled="disabled" @click="signIn">
                  Zaloguj
                </button>
              </div>
            </form>
          </div>
          <div class="flex w-4 mr-8 ml-4 lg:flex md:hidden items-center content-center">
            <div class="h-24 mx-auto vertical-divider"></div>
          </div>
          <div class="w-64 lg:block md:hidden ">
            <div class="login-header text-center">
              <h3 class="text-white">Los Santos Roleplay V</h3>
              <p class="text-xs leading-tigh text-red-lighter">Aktualna wersja: 2.137</p>
            </div>
            <div class="mt-5 text-justify text-grey">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita aperiam a veritatis ab, accusantium corrupti eaque eveniet nostrum ipsa magni? Facilis nobis optio vitae. Earum, eius aspernatur. Totam, aliquid quam!</p>
            </div>
          </div>
        </div>
</template>

<script>


export default {
  name: "LoginForm",
  data() {
    return {
      disabled: false,
      loading: false,
      username: '',
      password: ''
    };
  },
  methods: {
    signIn(e) {
      e.preventDefault()
     this.disabled = true;
     mp.trigger('loginButtonClicked', this.username, this.password);
    }
  }
}
</script>

<style>
</style>