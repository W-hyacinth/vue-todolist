import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = {
  fetch() {
    const arr = []
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === 'loglevel:webpack-dev-server') continue
        arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
      }
      arr.sort((a, b) => { return a.time - b.time })
    }
    return arr
  }
}

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch()
  },
  getters: {
  },
  mutations: {
    addTodoItem(state, todoItem) {
      const obj = {time: new Date().getTime(), item: todoItem, completed: false}
      localStorage.setItem(todoItem, JSON.stringify(obj))
      state.todoItems.push(obj)
    },
    removeTodoItem(state, payload) {
      const index = state.todoItems.findIndex(i => i.item === payload.todoItem.item)
      localStorage.removeItem(payload.todoItem.item)
      state.todoItems.splice(index, 1)
    },
    toggleTodoItem(state, payload) {
      const index = state.todoItems.findIndex(i => i.item === payload.todoItem.item)
      state.todoItems[index].completed = !state.todoItems[index].completed

      localStorage.removeItem(payload.todoItem.item)
      localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
    },
    clearAllTodoItem(state) {
      localStorage.clear()
      state.todoItems = []
    }
  }
})
