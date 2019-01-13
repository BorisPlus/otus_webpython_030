import Vue from 'vue'
import routes from './routes'
import { PageLayout } from '../src/layouts/Page.vue'

const __text_justForText = 'This is Vue App';
const __datetime_justForText = new Date();

const sideNav = new Vue({
  el: '#sideNav',
  render (h) {
    return h(require('../src/components/SideNav.vue'))
  }
});

const page = new Vue({
  el: '#page',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      console.log('Route:' + this.currentRoute + ' --> ' + matchingView)
      return matchingView
        ? require('./pages/' + matchingView + '.vue')
        : require('./pages/404.vue')
    }
  },
  render (h) {
    console.log("page.currentRoute = " + this.currentRoute);
    return h(this.ViewComponent)
  }
});

window.addEventListener('popstate', () => {
    page.currentRoute = window.location.pathname;
});

const checker = new Vue({
  el: '#checker',
  data: {
    text: __text_justForText,
    dt: __datetime_justForText
  }
});
