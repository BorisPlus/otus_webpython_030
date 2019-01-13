<template>
  <page-layout>
    <div>
    <h1>Это "Vue.js"-приложение</h1>
    <ul><b>Описание:</b>
        <li>"портирован" с моего примера "React+Redux"-приложения</li>
        <li>имеет "свою" систему роутинга между компонентами</li>
        <li>не содержит Ajax</li>
        <li>содержит соответствующую отладочную информацию</li>
    </ul>
    <ul><b>Мое мнение:</b>
        <li>Vue.js очень гибкий, сложную бизнес-логину реализовывать - лишь дело опыта.</li>
        <li>Но с React даже на страте было проще.</li>
    </ul>
  </div>
  </page-layout>
</template>

<script>
  import PageLayout from '../../src/layouts/Page.vue'
  export default {
    components: {
      PageLayout
    }
  }
</script>