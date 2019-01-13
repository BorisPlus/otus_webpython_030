<template>
  <div>
    <div>
      <div id="mySideNav" class="sideNav">
        <div class="sideNavSpan"><span class="closeBtn" v-on:click="closeSideNav">&raquo;</span></div>

        <div class="sideNavItemDisabled">
          <img alt='----' width='15' src="/public/img/favicon.818181.ico" />
        </div>

        <v-link class="sideNavItem" href="/">HOME</v-link>
        <v-link class="sideNavItem" href="/contacts">CONTACTS</v-link>

        <div class="sideNavItemDisabled">
          <img alt='----' width='15' src="/public/img/favicon.818181.ico" />
        </div>

        <v-link class="sideNavItem" href="/comments">COMMENTS</v-link>

        <div class="sideNavItemDisabled">
          <img alt='----' width='15' src="/public/img/favicon.818181.ico" />
        </div>

      </div>

      <div class="sideNavSpan">
        <span class="sideNavSpanSticky" v-on:click="openSideNav">&laquo;</span>
      </div>

    </div>
  </div>
</template>

<script>
  import VLink from '../../src/components/VLink.vue'
  export default {
    components: {
      VLink
    },
    methods: {
      openSideNav: function (e) {
        document.getElementById("mySideNav").style.width = '100%';
      },
      closeSideNav: function (e) {
        document.getElementById("mySideNav").style.width = '0';
      }
    }
  }
</script>

<style src="./SideNav.css"></style>
