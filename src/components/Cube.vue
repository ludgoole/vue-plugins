<template>
  <div>
    <ul class="Cube">
      <li
        v-for="{ direction, title, color } in images"
        :key="`in_${direction}`"
        :class="['in', `in-${direction}`]"
        :style="{ background: color }"
      >
        {{ title }}
      </li>
      <li
        v-for="{ direction, title, image, themes } in images"
        :key="`out_${direction}`"
        :class="['out', `out-${direction}`]"
        @click="clickHandler($event, title, themes)"
      >
        <img :src="image" :alt="title" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Cube',
  props: {
    images: {
      type: Array,
      require: true,
    },
  },
  methods: {
    clickHandler(evt, title, themes) {
      const transform = evt.target.parentNode.computedStyle.transform
      const isHover = transform.includes('150')
      console.log(isHover, title)
      if (isHover && themes) {
        this.$emit('switchTo', title, themes)
        // this.$router.push({
        //   path: '/Cube/branch',
        //   query: {
        //     title,
        //     themes: JSON.stringify(themes),
        //   },
        // })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.Cube {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
  overflow: initial !important;
  // transform: rotateX(45deg) rotateY(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
  animation: round 20s linear infinite;
}

.Cube .in {
  position: absolute;
  top: 25px;
  left: 25px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  color: whitesmoke;
  line-height: 100px;
  text-align: center;
}

.Cube .in img {
  height: 100%;
}

.in-front {
  transform: translateZ(50px);
}

.in-back {
  transform: translateZ(-50px);
}

.in-left {
  transform: rotateY(90deg) translateZ(50px);
}

.in-right {
  transform: rotateY(-90deg) translateZ(50px);
}

.in-top {
  transform: rotateX(90deg) translateZ(50px);
}

.in-bottom {
  transform: rotateX(-90deg) translateZ(50px);
}

.Cube .out {
  position: absolute;
  width: 150px;
  height: 150px;
  overflow: hidden;
  line-height: 150px;
  text-align: center;
  background: rgba(0, 255, 255, 1);
  transition: all 1s;
}

.Cube .out img {
  width: 100%;
  height: 100%;
}

/* 设置外层div */
.out-front {
  transform: translateZ(75px);
}

.out-back {
  transform: translateZ(-75px);
}

.out-left {
  transform: rotateY(90deg) translateZ(75px);
}

.out-right {
  transform: rotateY(-90deg) translateZ(75px);
}

.out-top {
  transform: rotateX(90deg) translateZ(75px);
}

.out-bottom {
  transform: rotateX(-90deg) translateZ(75px);
}

/* hover效果 */
.Cube:hover .out-front {
  transform: translateZ(150px);
}

.Cube:hover .out-back {
  transform: translateZ(-150px);
}

.Cube:hover .out-left {
  transform: rotateY(90deg) translateZ(150px);
}

.Cube:hover .out-right {
  transform: rotateY(-90deg) translateZ(150px);
}

.Cube:hover .out-top {
  transform: rotateX(90deg) translateZ(150px);
}

.Cube:hover .out-bottom {
  transform: rotateX(-90deg) translateZ(150px);
}

@keyframes round {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }

  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>
