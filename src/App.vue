<template>
  <div id="app">
    <TodoHeader />
    <TodoInput @addItem="addTodoItem" />
    <TodoList
      :todoItems="expectedTodoItems"
      @removeItem="removeTodoItem"
      @toggleItem="toggleTodoItem"
      todoTitle="예정된 일정" />
    <TodoList
      :todoItems="completedTodoItems"
      @removeItem="removeTodoItem"
      @toggleItem="toggleTodoItem"
      todoTitle="완료된 일정" />
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
    addTodoItem(todoItem) {
      const obj = {time: new Date().getTime(), item: todoItem, completed: false}
      localStorage.setItem(todoItem, JSON.stringify(obj))
      this.todoItems.push(obj)
    },
    removeTodoItem(todoItem) {
      const index = this.todoItems.findIndex(i => i.item === todoItem.item)
      localStorage.removeItem(todoItem)
      this.todoItems.splice(index, 1)
    },
    toggleTodoItem(todoItem) {
      const index = this.todoItems.findIndex(i => i.item === todoItem.item)
      this.todoItems[index].completed = !this.todoItems[index].completed

      localStorage.removeItem(todoItem.item)
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    },
    clearAllTodoItem() {
      localStorage.clear()
      this.todoItems = []
    }
  },
  computed: {
    expectedTodoItems() {
      return this.todoItems.filter(e => !e.completed)
    },
    completedTodoItems() {
      return this.todoItems.filter(e => e.completed)
    }
  },
  created () {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'loglevel:webpack-dev-server') continue
        this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
      }
      this.todoItems.sort((a, b) => { return a.time - b.time })
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
