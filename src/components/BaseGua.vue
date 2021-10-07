<template>
  <div class="BaseGua">
    <ul @click="onClick(guaXiang)">
      <li
        v-for="(yao, index) in guaXiang"
        :key="index"
        class="flex flex-middle"
        @click="onChange(yao, index)"
      >
        <p v-if="naJia.length" class="BaseGua-naJia font-size-10">
          {{ naJia[index] }}
        </p>
        <p
          :style="style"
          :class="[
            'BaseGua-yao',
            {
              'is-yin': yao === 0,
              'is-yang': yao === 1,
              'is-dong': index === 6 - dongYaoOrder
            }
          ]"
        ></p>
        <p
          v-if="Object.keys(shiYing).length"
          class="BaseGua-shiYing font-size-10"
        >
          {{ shiYing[6 - index] }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'BaseGua',
  props: {
    size: {
      type: Number,
      default: 100
    },
    guaXiang: {
      type: Array,
      require: true
    },
    naJia: {
      type: Array,
      default: function() {
        return []
      }
    },
    shiYing: {
      type: Object,
      default: function() {
        return {}
      }
    },
    dongYaoOrder: {
      type: Number,
      default: -1
    }
  },
  computed: {
    width() {
      return this.size
    },
    height() {
      return this.size / 10
    },
    style() {
      const { width, height } = this
      return {
        width: width + 'px',
        height: height + 'px',
        margin: `${height / 2}px`
      }
    }
  },
  methods: {
    onClick() {
      this.$emit('click', this.guaXiang.join(''))
    },
    onChange(yao, index) {
      const guaXiang = _.cloneDeep(this.guaXiang)
      guaXiang[index] = yao === 0 ? 1 : 0

      this.$emit('change', guaXiang.join(''), this.guaXiang.join(''))
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseGua {
  display: inline-block;

  &-yao {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 10px;

    &.is-yin {
      &::before {
        position: absolute;
        right: 55%;
        left: 0;
        height: 100%;
        background: black;
        content: '';
      }

      &::after {
        position: absolute;
        right: 0;
        left: 55%;
        height: 100%;
        background: black;
        content: '';
      }
    }

    &.is-yang {
      background: darkred;
    }

    &.is-dong {
      filter: blur(2px);
    }
  }
}
</style>
