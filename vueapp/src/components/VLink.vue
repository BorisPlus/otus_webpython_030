<template>
  <a
    v-bind:href="href"
    v-bind:class="{ active: isActive }"
    v-on:click="go"
  >
    <slot></slot>
  </a>
</template>

<script>
  import routes from '../../src/routes'
  function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }


  export default {
    props: {
      href: {
        type:String,
        required: true
      }
    },
    computed: {
      isActive () {
        return this.href === this.$root.currentRoute
      }
    },
    methods: {
      go (event) {
        event.preventDefault()
        document.getElementById("mySideNav").style.width = '0';
        // Usage!
        sleep(500).then(() => {
            this.$root.currentRoute = this.href;
            window.history.pushState(
              null,
              routes[this.href],
              this.href
            );
        });

      }
    }
  }
</script>
