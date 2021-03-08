<template>
  <div class="home">
    <TheScroll></TheScroll>
    <p>{{ moment.get() }}</p>
    <p>{{ moment.format() }}</p>
    <p>{{ moment.format('YYYY-MM-DD hh:mm:ss') }}</p>
    <p id="math" class="is-scroll"></p>
    <p ref="math" class="is-scroll">
      When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and
      they are \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]
    </p>
    <div class="c1">
      <div class="c2"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TheScroll from '@/components/plugins/TheScroll.vue'
import moment from 'moment'
import Hammer from 'hammerjs'
console.log('hammer', Hammer)
window.Hammer = Hammer

export default {
  name: 'Home',
  components: {
    TheScroll
  },
  data() {
    return {
      // eslint-disable-next-line no-useless-escape
      htmlStr: '\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]'
    }
  },
  computed: {
    moment() {
      return moment()
    }
  },
  mounted() {
    // eslint-disable-next-line no-useless-escape
    this.$nextTick(() => {
      this.htmlStr = `\\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\] <p>\\[\\sqrt{b^2-4ac}\\]</p>`
      // console.log('mounted', window.MathJax.typesetPromise, this.$refs.math)
      window.MathJax.typesetPromise([this.$refs.math])
      // window.MathJax.startup.promise.then(v => {
      //   console.log('vvv', v)
      // })

      // eslint-disable-next-line no-useless-escape
      const htmlStr = `x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a} <p>\\sqrt{b^2-4ac}</p>`
      document
        .querySelector('#math')
        .appendChild(window.MathJax.tex2chtml(htmlStr))
    })
    // setTimeout(() => {
    //   window.MathJax.typesetPromise([this.$refs.math])
    //     .then(v => {
    //       console.log('vvv', v)
    //     })
    //     .catch(err => {
    //       console.log('err', err)
    //     })
    // }, 1000)
    // this.$nextTick(() => {
    //   // console.log(
    //   //   'MathJax',
    //   //   window.MathJax.tex2chtml,
    //   //   // eslint-disable-next-line no-useless-escape
    //   //   window.MathJax.tex2chtml('x = {-b pm \sqrt{b^2-4ac} \over 2a}')
    //   // )

    //   // eslint-disable-next-line no-useless-escape
    //   // this.htmlStr = 'x = {-b pm \sqrt{b^2-4ac} \over 2a}'/

    //   console.log(
    //     'typesetPromise',
    //     window.MathJax.typesetPromise([this.$refs.math]).then(v => {
    //       console.log('vvv', v)
    //     })
    //   )
    // this.htmlStr = window.MathJax.tex2chtml(
    //   // eslint-disable-next-line no-useless-escape
    //   'x = {-b pm \sqrt{b^2-4ac} \over 2a}'
    // )
    // const htmlStr = `\\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\]`
    // document.querySelector('#math').appendChild(htmlStr)
    // console.log(typeof this.htmlStr)
    // window.MathJax.Hub &&
    //   window.MathJax.Hub.Queue([
    //     'Typeset',
    //     window.MathJax.Hub,
    //     document.getElementById('app')
    //   ])
    // })
  }
}
</script>
<style lang="scss">
.home {
  background: chocolate;
}
.c1,
.c2 {
  width: 100px;
  height: 100px;
  background: brown;
  // filter: opacity(0.5);
}
.c1 {
  filter: contrast(20);
  overflow: hidden;
  animation: down 5s linear infinite;
}
.c2 {
  background: black;
  // transform: translate(0, -50px);
  border-radius: 50%;
  animation: up 5s linear infinite;
  // filter: opacity(0.5);
  // filter: brightness(2);
  // filter: contrast(2);
}

@keyframes down {
  to {
    transform: translate(0, 100px);
  }
}
@keyframes up {
  to {
    transform: translate(0, -100px);
  }
}
</style>
