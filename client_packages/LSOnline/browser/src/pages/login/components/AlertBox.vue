<template>
  <div class="alert-box" v-if="messages.message">
    <div style="max-width: 50vh" class="p-2 items-center text-indigo-lightest leading-none lg:rounded flex lg:inline-flex font-sans" :class="[messages.type === 'error' ? 'bg-red-darker' : 'bg-blue-darker']">
      <span class="flex rounded-full bg-red uppercase px-2 py-1 text-xs font-bold mr-3 uppercase" :class="[messages.type === 'error' ? 'bg-red' : 'bg-blue']">
      {{ messages.type === 'info' ? 'info' : 'błąd' }}
      </span>
      <span class="font-semibold mr-2 text-left flex-auto">
        {{ messages.message }} {{ messages.type === 'error' ? `(${messages.count}/3)` : '' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
    messages: {
      type: Object,
      default: () => {}
    }
  },
   watch: {
    messages: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        setTimeout(() => {
          this.$emit('update:messages', {})
        }, 8000);
      }
    }
  },
}
</script>
<style lang="scss" scoped>

</style>

