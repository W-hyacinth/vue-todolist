<template>
  <article class="todo-list__article">
    <h2 class="todo-list__title">
      {{ todoTitle }}
      <span v-if="todoItems.length > 0" class="todo-list__count">({{todoItems.length}}건)</span>
    </h2>
    <transition-group tag="ul" name="list" v-if="todoItems.length > 0" class="todo-list__list">
      <li
        v-for="(todoItem, index) in todoItems"
        :key="index"
        class="todo-list__item">
        <span class="todo-list__name" :class="{'todo-list__name--completed': todoItem.completed}">
          {{ todoItem.item }}
        </span>
        <label class="todo-list__label"
               @click.prevent="toggleComplete({todoItem})"
               @keypress.enter.prevent="toggleComplete({todoItem})"
               tabindex="0">
          <input
            v-model="todoItem.completed"
            type="checkbox"
            class="todo-list__input ally"
            :aria-label="`${todoItem.item} 일정 완료여부 체크`"
            tabindex="-1">
          <span class="todo-list__icon">
            <IconCheck :size="20" :color="!todoItem.completed ? '#dedede' : '#000'" />
          </span>
        </label>
        <button
          @click="removeItem(todoItem)"
          type="button"
          ref="removeBtn"
          class="todo-list__btn todo-list__btn--delete"
          aria-label="입력된 내용 삭제">
          <IconTrash :color="'#c23934'" />
        </button>
      </li>
    </transition-group>
    <p v-else class="todo-list__notice todo-list__notice--nodata">
      {{ todoTitle }}이 없습니다.
    </p>
  </article>
</template>
<script>
import { mapMutations } from 'vuex'
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
    ...mapMutations({
      toggleComplete: 'toggleTodoItem',
    }),
    removeItem(todoItem) {
      const delItem = confirm(`${todoItem.item} 일정을 삭제하시겠습니까`)
      if (delItem) {
        alert('삭제되었습니다')
        this.$store.commit('removeTodoItem', {todoItem})
      }
    },
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
    order: 1;
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
    order: 2;
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
      order: 3;
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
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-leave-active {
  position: absolute;
  width: calc(100% - 32px - env(safe-area-inset-right) - env(safe-area-inset-left));
  pointer-events: none;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
.list-enter {
  transform: translateY(30px);
}
.list-leave-to {
  transform: translateY(-10px);
}
</style>
