<template>
  <div class="TopicInfoList">
    <dl
      class="TopicInfoList-list"
      v-for="(topicInfo, index) in topicInfoList"
      :key="index"
    >
      <dt class="TopicInfoList-header" v-if="hasTopicList(topicInfo)">
        {{ index }}.{{ topicInfo.sectionName }}
      </dt>
      <dd
        class="TopicInfoList-item"
        v-for="topic in topicInfo.topicList"
        :key="topic.topicId"
      >
        <template
          v-if="!topic.isDelete && (val === '-1' || topic[prop] === val)"
        >
          <p>
            <el-checkbox v-model="topic.isChecked">备选项</el-checkbox>
            <el-tag :type="topic.type" effect="dark">{{ topic.type }}</el-tag>
          </p>
          <p>{{ topic.content }}</p>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'TopicInfoList',
  data() {
    return {
      topicInfoList: [],
      prop: '',
      val: '-1'
    }
  },
  computed: {
    topicList() {
      return this.topicInfoList.reduce((a, c) => a.concat(c.topicList), [])
    }
  },
  mounted() {
    setTimeout(() => {
      this.topicInfoList = this.getTopicInfoList()
      window.topicInfoList = this.topicInfoList
      window.topicList = this.topicList
      window.filterTopicInfoList = this.filterTopicInfoList
      window.updateTopic = this.updateTopic
    })
  },
  methods: {
    getTopicInfoList() {
      return [
        {
          sectionName: '选择题',
          score: 2,
          topicList: [
            {
              topicId: Symbol(1),
              isChecked: false,
              isDelete: false,
              type: 'success',
              content: '潜龙勿用'
            }
          ]
        },
        {
          sectionName: '填空题',
          score: 4,
          topicList: [
            {
              topicId: Symbol(2),
              isChecked: false,
              isDelete: false,
              type: 'success',
              content: '见龙在田'
            },
            {
              topicId: Symbol(3),
              isChecked: false,
              isDelete: false,
              type: 'warning',
              content: '夕惕若厉'
            }
          ]
        },
        {
          sectionName: '解答题',
          score: 8,
          topicList: [
            {
              topicId: Symbol(4),
              isChecked: false,
              isDelete: false,
              type: 'success',
              content: '或跃在渊'
            },
            {
              topicId: Symbol(5),
              isChecked: false,
              isDelete: false,
              type: 'warning',
              content: '飞龙在天'
            },
            {
              topicId: Symbol(6),
              isChecked: false,
              isDelete: false,
              type: 'danger',
              content: '亢龙有悔'
            }
          ]
        }
      ]
    },
    filterTopicInfoList(prop, val) {
      this.prop = prop
      this.val = val
      // if (value === '-1') return this.topicInfoListClone
      // this.topicInfoList = this.topicInfoListClone.reduce((a, c) => {
      //   const topicList = c.topicList.filter(topic => topic[prop] === value)
      //   topicList.length && a.push({ ...c, topicList })
      //   return a
      // }, [])
      // return this.topicInfoList
      // console.log(topicInfo)
    },
    hasTopicList(topicInfo) {
      return topicInfo.topicList
        .filter(topic => !topic.isDelete)
        .filter(topic =>
          this.val === '-1' ? true : topic[this.prop] === this.val
        ).length
    },
    updateTopic(topicId, prop, value) {
      const index = this.topicList.findIndex(topic => topic.topicId === topicId)
      index > -1 && (this.topicList[index][prop] = value)
    },
    tabClick(item) {
      console.log(item)
    }
  }
}
</script>
