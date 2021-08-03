<template>
  <article class="todo-input__article">
    <div class="todo-input__wrap" :class="{'todo-input__wrap--focus': focusOnInput}">
      <input
        :value="newTodoItem"
        @input="updateInput"
        ref="todoInput"
        @keypress.enter="addTodo"
        @focus="focusOnInput = true"
        @blur="focusOnInput = false"
        class="todo-input__input"
        placeholder="할 일을 입력하세요"
        autocapitalize="off"
        aria-label="Todo 입력란" />
      <button
        v-if="newTodoItem"
        @click="clearInput"
        type="button"
        ref="resetBtn"
        class="todo-input__btn todo-input__btn--reset"
        aria-label="일정 입력 초기화">
        <IconDel />
      </button>
    </div>
    <button
      v-touch.prevent="addTodo"
      type="submit"
      ref="addBtn"
      class="todo-input__btn todo-input__btn--submit">
      <span class="ally">일정</span>저장
    </button>
  </article>
</template>
<script>
import IconDel from './icon/IconDel'
export default {
  name: 'TodoInput',
  data () {
    return {
      newTodoItem: '',
      focusOnInput: false
    }
  },
  methods: {
    updateInput (event) {
      this.newTodoItem = event.target.value
    },
    addTodo (e) {
      const isSameTodoItem = localStorage.getItem(this.newTodoItem)
      if (!this.newTodoItem) {
        alert('추가하려는 내용을 입력해주세요.')
        return
      } else if (isSameTodoItem) {
        alert('이미 입력된 내용입니다.')
        return
      }

      this.$store.commit('addTodoItem', this.newTodoItem)
      this.resetInput()
    },
    clearInput () {
      this.resetInput()
      this.$refs.todoInput.focus()
    },
    resetInput () {
      this.newTodoItem = ''
    }
  },
  components: {
    IconDel
  }
}
</script>
<style lang="scss" scoped>
.todo-input__article {
  display: flex;
  flex-direction: row;
}
.todo-input {
  &__wrap {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    padding: 13px 10px;
    background-color: #fff;
    border: 1px solid #d3d7df;
    border-radius: 3px;
    &--focus {
      border-color: #000;
    }
  }
  &__input {
    flex: 0 1 auto;
    width: 100%;
    line-height: 1.5;
  }
  &__btn {
    flex: 0 0 auto;
    cursor: pointer;
    &--reset {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &--submit {
      width: 70px;
      margin-left: 5px;
      font-size: 16px;
      color: #fff;
      line-height: 1.5;
      background-color: #000;
      border-radius: 3px;
    }
  }
}
</style>
