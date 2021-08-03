<template>
  <div id="app">
    <TodoHeader />
    <TodoInput />
    <TodoList
      :todoItems="expectedTodoItems"
      todoTitle="예정된 일정" />
    <TodoList
      :todoItems="completedTodoItems"
      todoTitle="완료된 일정" />
    <TodoClearButton v-if="this.todoItems.length > 0" />
    <TodoFooter />
  </div>
</template>

<script>
import 'modern-normalize'
import { mapState } from 'vuex'
import TodoHeader from './components/TodoHeader'
import TodoFooter from './components/TodoFooter'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoClearButton from './components/TodoClearButton'
export default {
  name: 'App',
  computed: {
    ...mapState(['todoItems']),
    expectedTodoItems () {
      return this.todoItems.filter(e => !e.completed)
    },
    completedTodoItems () {
      return this.todoItems.filter(e => e.completed)
    }
  },
  components: {
    TodoHeader,
    TodoFooter,
    TodoInput,
    TodoList,
    TodoClearButton
  }
}
</script>

<style>
body {
  width: 100%;
  font-family: 'ubuntu';
  background-color: #f1f1f1;
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
.ally {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
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
/deep/ .todo__btn--clear {
  margin: 2rem 0;
}
/deep/ #footer {
  margin-top: auto;
}
</style>
