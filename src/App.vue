<template>
  <div id="app">
    <TodoHeader />
    <TodoInput @addItem="addTodoItem" />
    <TodoList
      :todoItems="todoItems"
      @removeItem="removeTodoItem"
      @toggleItem="toggleTodoItem" />
    <TodoClearButton v-if="todoItems.length > 0" @clearItem="clearAllTodoItem" />
    <TodoFooter />
  </div>
</template>

<script>
import 'modern-normalize'
import TodoHeader from './components/TodoHeader'
import TodoFooter from './components/TodoFooter'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoClearButton from './components/TodoClearButton'
export default {
  name: 'App',
  data () {
    return {
      todoItems: []
    }
  },
  methods: {
    addTodoItem: function (todoItem) {
      const obj = {time: new Date(), item: todoItem, completed: false}
      localStorage.setItem(todoItem, JSON.stringify(obj))
      this.todoItems.push(obj)
    },
    removeTodoItem: function (todoItem, index) {
      localStorage.removeItem(todoItem)
      this.todoItems.splice(index, 1)
    },
    toggleTodoItem: function (todoItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed

      localStorage.removeItem(todoItem.item)
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    },
    clearAllTodoItem: function () {
      localStorage.clear()
      this.todoItems = []
    }
  },
  created () {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'loglevel:webpack-dev-server') continue
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
      }
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
