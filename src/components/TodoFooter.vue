<template>
  <footer id="footer">
    Footer
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
}
</style>
