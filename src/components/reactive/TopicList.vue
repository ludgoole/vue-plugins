<template>
  <div class="TopicList">
    <el-input-number
      v-model="currTopicInfo.score"
      :step="0.5"
    ></el-input-number>
    <ul class="TopicList-list">
      <li
        class="TopicList-item"
        v-for="topicInfo in topicList"
        :key="topicInfo.id"
      >
        <header>
          <p>
            {{ topicInfo.title }}、{{ topicInfo.name }} {{ topicInfo.score }}分
          </p>
          <el-button type="primary" @click="currTopicInfo = topicInfo">
            编辑
          </el-button>
        </header>
        <el-tabs
          class="TopicList-children"
          v-model="topicInfo.activeId"
          type="card"
          @tab-click="tabClick"
        >
          <el-tab-pane
            class="TopicList-child"
            v-for="({ answers, options, id }, index) in topicInfo.children"
            :key="id"
            :label="`小题${index + 1}`"
          >
            <ul class="TopicList-options flex flex-center">
              <li
                class="TopicList-option"
                v-for="({ value, extend }, index) in options"
                :key="index"
              >
                <el-button :type="answers.includes(value) ? 'primary' : ''">
                  {{ value }}
                </el-button>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TopicList',
  data() {
    return {
      topicList: [
        {
          id: Symbol(0),
          name: '单择题',
          isObjective: true,
          code: '01',
          title: '1',
          score: '2',
          children: [
            {
              id: Symbol(1),
              answers: ['A'],
              options: [
                {
                  value: 'A',
                  extend: '√'
                },
                {
                  value: 'B',
                  extend: '×'
                },
                {
                  value: 'C',
                  extend: ''
                },
                {
                  value: 'D',
                  extend: ''
                }
              ]
            }
          ]
        },
        {
          id: Symbol(0),
          name: '多选题',
          isObjective: true,
          code: '02',
          title: '2',
          score: '4',
          children: [
            {
              id: Symbol(1),
              answers: ['A', 'B'],
              options: [
                {
                  value: 'A',
                  extend: '√'
                },
                {
                  value: 'B',
                  extend: '×'
                },
                {
                  value: 'C',
                  extend: ''
                },
                {
                  value: 'D',
                  extend: ''
                }
              ]
            }
          ]
        },
        {
          id: Symbol(0),
          name: '判断题',
          isObjective: true,
          code: '03',
          title: '3',
          score: '2',
          children: [
            {
              id: Symbol(1),
              answers: ['A'],
              options: [
                {
                  value: 'A',
                  extend: '√'
                },
                {
                  value: 'B',
                  extend: '×'
                }
              ]
            }
          ]
        },
        {
          id: Symbol(0),
          name: '填空题',
          isObjective: true,
          code: '04',
          title: '4',
          score: '2',
          children: [
            {
              id: Symbol(1),
              answers: ['A', '12'],
              options: [
                {
                  value: 'A',
                  extend: '√'
                },
                {
                  value: 'B',
                  extend: '×'
                },
                {
                  value: '12',
                  extend: ''
                },
                {
                  value: '24',
                  extend: ''
                }
              ]
            },
            {
              id: Symbol(1),
              answers: ['B'],
              options: [
                {
                  value: 'A',
                  extend: '√'
                },
                {
                  value: 'B',
                  extend: '×'
                }
              ]
            }
          ]
        },
        {
          id: Symbol(0),
          name: '主观题',
          isObjective: false,
          code: '05',
          title: '5',
          score: '8'
        }
      ],
      currTopicInfo: {
        score: 0
      }
    }
  },
  mounted() {
    window.topicList = this.topicList
    window.currTopicInfo = this.topicList[0]
  },
  methods: {
    tabClick(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped></style>
