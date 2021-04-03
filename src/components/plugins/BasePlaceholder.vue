<template>
  <div class="BasePlaceholder">
    <content-placeholders :rounded="true" :animated="true" :centered="false">
      <content-placeholders-img />
      <content-placeholders-heading :img="true" />
      <content-placeholders-text :lines="lines" />
    </content-placeholders>
  </div>
</template>

<script>
import Vue from 'vue'
import VueContentPlaceholders from 'vue-content-placeholders'

Vue.use(VueContentPlaceholders)
export default {
  data() {
    return {
      lines: 4
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 40px;
$border-radius: 8px;
.BasePlaceholder {
  /deep/ .vue-content-placeholders {
    &-img {
      height: $height * 8;
      border-radius: $border-radius;
    }
    &-heading {
      &__img {
        width: $height * 3;
        height: $height * 3;
        border-radius: $border-radius;
      }
      &__content {
        & > div {
          height: $height;
          border-radius: $border-radius;
        }
      }
    }
    &-text {
      &__line {
        height: $height;
        border-radius: $border-radius;
      }
    }
  }
}
</style>
