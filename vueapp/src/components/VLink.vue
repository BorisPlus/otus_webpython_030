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

        // I don't like duplication logic, but this is thr aggregation
        document.getElementById("mySideNav").style.width = '0';

        this.$root.currentRoute = this.href;
        window.history.pushState(null, routes[this.href], this.href);
        window.dispatchEvent(new Event('popstate'));

        console.log("this.href = " + this.href);
        console.log("routes[this.href] = " + window.location.pathname);
        console.log("window.location.pathname = " + window.location.pathname);
      }
    }
  }
</script>
