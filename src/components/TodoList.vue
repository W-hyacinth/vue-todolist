<template>
  <article class="todo-list__article">
    <h2 class="todo-list__title">{{ todoTitle }}</h2>
    <ul v-if="todoItems.length > 0" class="todo-list__list">
      <li
        v-for="(todoItem, index) in todoItems"
        :key="index"
        class="todo-list__item">
        <label class="todo-list__label" @click.prevent="toggleComplete(todoItem, index)">
          <input
            v-model="todoItem.completed"
            type="checkbox"
            class="todo-list__input"
            aria-label="입력된 내용 선택">
          <span class="todo-list__icon">
            <IconCheck :size="20" :color="!todoItem.completed ? '#dedede' : '#000'" />
          </span>
        </label>
        <span class="todo-list__name" :class="{'todo-list__name--completed': todoItem.completed}">
          {{ todoItem.item }}
        </span>
        <button
          @click="removeItem(todoItem.item, index)"
          type="button"
          ref="removeBtn"
          class="todo-list__btn todo-list__btn--delete"
          aria-label="입력된 내용 삭제">
          <IconTrash :color="'#c23934'" />
        </button>
      </li>
    </ul>
    <p v-else class="todo-list__notice todo-list__notice--nodata">
      {{ todoTitle }}이 없습니다.
    </p>
  </article>
</template>
<script>
import IconTrash from './icon/IconTrash'
import IconCheck from './icon/IconCheck'
export default {
  name: 'TodoList',
  props: {
    todoItems: {
      type: Array,
      default: () => {return []}
    },
    todoTitle: {
      type: String,
      default: () => {return '해야 할 일'}
    }
  },
  methods: {
    removeItem: function (todoItem, index) {
      const delItem = confirm(`${todoItem} 내용을 삭제하시겠습니까`)
      if (delItem) {
        alert('삭제되었습니다')
        this.$emit('removeItem', todoItem, index)
      }
    },
    toggleComplete: function (todoItem) {
      this.$emit('toggleItem', todoItem)
    }
  },
  components: {
    IconTrash,
    IconCheck
  },
}
</script>
<style lang="scss" scoped>
.todo-list {
  &__article {
    margin-top: 2rem;
  }
  &__list {
    padding: 0;
    margin: 0;
  }
  &__item {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #d3d7df;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    &:nth-of-type(n+2) {
      margin-top: 10px;
    }
  }
  &__label {
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
  }
  &__input {
    &:checked {
      + .todo-list__icon {
        display: block;
      }
    }
  }
  &__icon {
    display: block;
    width: 20px;
  }
  &__name {
    flex: 0 1 auto;
    display: block;
    width: 100%;
    margin-right: 10px;
    &--completed {
      color: #999;
      text-decoration: line-through;
    }
  }
  &__btn {
    cursor: pointer;
    &--delete {
      margin-left: auto;
    }
  }
  &__notice {
    margin: 0;
    padding: 20px 10px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #d3d7df;
    border-radius: 3px;
  }
}
</style>
