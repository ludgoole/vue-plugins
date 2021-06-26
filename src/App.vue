<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import img from '@assets/image/hope.jpg'

export default {
  data() {
    return {
      img
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
      font-size: 12px;
    }
  }
}

.MathJax {
  outline: 0;
}
// .MathJax_Display {
//   overflow-x: auto;
//   overflow-y: hidden;
// }
.is-scroll {
  max-width: 100vw;
  font-size: 20px;
  white-space: nowrap;
  // width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.img1 {
  width: 100px;
  height: 100px;
  background: url(./assets/image/hope.jpg);
}
.img2 {
  width: 100px;
  height: 100px;
  background: url(./assets/logo.png);
}
</style>
