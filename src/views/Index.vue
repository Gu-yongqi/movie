<template>
  <div>
    <div class="index">
      <img src="img/logo.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  created() {
    setTimeout(v => {
      this.$router.push('/home')
    }, 2000)
  }
}
</script>

<style lang="scss">
.index {
  text-align: center;
  margin-top: 180px;
  img {
    width: 300px;
  }
}
</style>