<template>
  <header class="todo__header">
    <h1 class="todo__title">TODO LIST</h1>
  </header>
</template>
<script>
export default {
  name: 'TodoHeader'
}
</script>
<style lang="scss" scoped>
.todo__header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.todo__title {
  flex: 1 1 auto;
  width: 100%;
  margin: 2.5rem 0;
  font-weight: 900;
  text-align: center;
}
</style>
