<template>
  <footer id="footer">
    &copy; W-hyacinth. ALL RIGHTS RESERVED.
  </footer>
</template>
<script>
export default {
  name: 'TodoFooter'
}
</script>
<style lang="scss" scoped>
#footer {
  padding: 20px 0 calc(20px + env(safe-area-inset-bottom));
  font-size: 14px;
  text-align: center;
}
</style>
