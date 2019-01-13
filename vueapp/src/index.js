import Vue from 'vue'
import routes from './routes'

const app = new Vue({
  el: '#app',
  data: {
    input: 'new Vue hello',
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
    return h(this.ViewComponent)
  }
});
window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
});


const test = new Vue({
  el: '#test',
  data: {
    test: 'Vue test success!'
  }
});;