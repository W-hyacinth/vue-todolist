<template>
  <div id="app">
    <TodoHeader />
    <TodoInput />
    <TodoList />
    <TodoFooter />
  </div>
</template>

<script>
import 'modern-normalize'
import TodoHeader from './components/TodoHeader'
import TodoFooter from './components/TodoFooter'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
export default {
  name: 'App',
  components: {
    TodoHeader,
    TodoFooter,
    TodoInput,
    TodoList,
  }
}
</script>

<style>
body {
  width: 100%;
  font-family: 'ubuntu';
  background-color: #f6f6f6;
}
input {
  font-size: 16px;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  appearance: none;
}
button {
  padding: 0;
  border: 0;
  background-color: transparent;
  border-radius: 0;
  appearance: none;
}
</style>
<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  padding-right:calc(16px + env(safe-area-inset-right));
  padding-left:calc(16px + env(safe-area-inset-left));
  min-height: 100vh;
}
</style>
