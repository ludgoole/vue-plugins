<template>
  <div class="Word">
    <van-nav-bar
      :title="chapter.word"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <section class="px-5">
      <div class="Word-font flex justify-between mt-5">
        <p class="Word-dz">{{ chapter.word }}</p>
        <p class="Word-xz">{{ chapter.word }}</p>
        <p class="Word-ls">{{ chapter.word }}</p>
        <p id="draw"></p>
        <img @click="goPile" :src="chapter.image" />
      </div>
      <p class="mt-2 text-gray-400 text-xs">{{ chapter.swjz }}</p>
      <dl class="mt-5">
        <dt>{{ spell }}</dt>
        <dd
          v-for="homophonic in homophonics"
          :key="homophonic"
          class="text-gray-400 text-xs"
        >
          {{ homophonic }}
        </dd>
      </dl>
      <dl class="mt-5">
        <dt>想象</dt>
        <dd
          v-for="imagenation in chapter.imagenations"
          :key="imagenation.label"
          class="text-gray-400 text-ms"
        >
          {{ imagenation.label }}: {{ imagenation.value }}
        </dd>
      </dl>
    </section>
  </div>
</template>

<script>
import cnchar from 'cnchar'
// import 'cnchar-poly'
// import 'cnchar-order'
// import 'cnchar-trad'
import 'cnchar-draw'
// import 'cnchar-idiom'
// import 'cnchar-xhy'
// import 'cnchar-radical'
// import 'cnchar-words'
// import 'cnchar-explain'
// import 'cnchar-voice'
export default {
  name: 'Word',
  computed: {
    chapter() {
      return JSON.parse(this.$route.query.chapter)
    },
    spell() {
      return cnchar.spell(this.chapter.word)
    },
    homophonics() {
      return [1, 2, 3, 4].map((tone) => {
        return cnchar
          .spellToWord(this.spell + tone)
          .split('')
          .join(' ')
      })
    },
  },
  mounted() {
    cnchar.draw(this.chapter.word, {
      el: '#draw',
      type: cnchar.draw.TYPE.ANIMATION,
      animation: {
        autoAnimate: true,
      },
    })
  },
  methods: {
    goPile() {
      this.$router.push({
        path: '/memory/pile',
        query: this.$route.query,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$size: 60px;

.Word {
  &-font {
    img {
      width: $size;
    }

    p {
      width: $size;
      height: $size;
      overflow: hidden;
      font-weight: 100;
      font-size: $size;
      line-height: $size;
      text-align: center;
      background: url('https://www.cidianwang.com/images/z_100.gif');
      background-repeat: no-repeat;
      background-position: center center;
      border: 1px solid sandybrown;
    }
  }

  &-dz {
    font-family: 'jwdz';
  }

  &-xz {
    font-size: 40px !important;
    font-family: 'zszd';
  }

  &-ls {
    font-size: $size !important;
    font-family: 'gfls';
  }
}
</style>
