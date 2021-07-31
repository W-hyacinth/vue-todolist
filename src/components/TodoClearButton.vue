<template>
  <button
    @click="clearTodo"
    type="button"
    class="todo__btn todo__btn--clear">
    전체 초기화
  </button>
</template>
<script>
export default {
  name: 'TodoClearButton',
  methods: {
    clearTodo() {
      const isClearAll = confirm('현재 등록된 모든 내용을 삭제하시겠습니까?')
      if (isClearAll) {
        alert('모든 내용이 삭제됬습니다')
        this.$emit('clearItem')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.todo__btn {
  cursor: pointer;
  &--clear {
    align-self: center;
    display: block;
    padding: 15px 20px;
    color: #fff;
    background-color: #c23934;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
  }
}
</style>
