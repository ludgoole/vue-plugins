<template>
  <div class="Chat">
    <lemon-imui
      :user="user"
      ref="IMUI"
      simple
      hideMessageTime
      hideMessageName
      @pull-messages="handlePullMessages"
      @send="handleSend"
    >
    </lemon-imui>
  </div>
</template>

<script>
import Vue from 'vue'
import LemonIMUI from 'lemon-imui'
import 'lemon-imui/dist/index.css'
import { get } from '@/request'

Vue.use(LemonIMUI)

const getTime = () => {
  return new Date().getTime()
}
const generateRandId = () => {
  return Math.random()
    .toString(36)
    .substr(-8)
}
const generateMessage = (toContactId = '', fromUser, content) => {
  return {
    // 唯一ID
    id: generateRandId(),
    // 发送状态
    status: 'succeed',
    // 消息类型
    type: 'text',
    // 消息内容
    content: content || '你好, ' + toContactId,
    // 发送时间
    sendTime: getTime(),
    // 联系人
    toContactId,
    // 发送人
    fromUser
  }
}
const getUser = (id, displayName, avatar) => {
  return {
    // 用户ID
    id,
    // 昵称
    displayName,
    // 头像
    avatar
  }
}
export default {
  name: 'Chat',
  data() {
    return {
      // 当前用户
      user: getUser('haha', '哈哈', require('@/assets/image/boy.jpeg')),

      // 联系人
      robot: getUser('xixi', '嘻嘻', require('@/assets/image/girl.jpeg'))
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * @description: 初始化联系人，并定位到第一个联系人
     * @returns void
     * @example:
     */
    init() {
      const contactData = {
        ...this.robot,
        unread: 0,
        lastSendTime: 1566047865417
      }
      const { IMUI } = this.$refs
      const contactDataList = [contactData]
      IMUI.initContacts && IMUI.initContacts(contactDataList)

      IMUI.changeContact(contactDataList[0].id)
    },

    /**
     * @description: 拉取消息
     * @param {Object } contact 联系人
     * @param {Function } next 下一步
     * @param {Object } instance 组件实例
     * @returns void
     * @example:
     */
    handlePullMessages(contact, next, instance) {
      console.log('handlePullMessages', contact, next, instance)
      setTimeout(() => {
        const messages = [
          generateMessage(this.robot.id, this.user),
          generateMessage(this.user.id, this.robot)
          // {
          //   ...generateMessage(this.robot.id, this.user),
          //   status: 'failed',
          // },
        ]
        next(messages, true)
      }, 500)
    },

    /**
     * @description: 发送消息
     * @param {Object } message 消息
     * @param {Function } next 下一步
     * @param {Object } file 文件
     * @returns void
     * @example:
     */
    handleSend(message, next, file) {
      console.log('handleSend', message, next, file)
      setTimeout(() => {
        next()
        this.handleReceive(message.content)
      }, 100)
    },

    /**
     * @description: 接收消息
     * @returns void
     * @example:
     */
    handleReceive(msg) {
      get('/api.php', {
        key: 'free',
        appid: 0,
        msg
      }).then(data => {
        console.log('data', data.content)
        const { content } = data
        const message = generateMessage(this.robot.id, this.robot, content)

        this.$refs.IMUI.appendMessage(message, true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Chat {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}

/deep/ .lemon-wrapper {
  width: 100%;
  height: 100% !important;

  .lemon-container__title {
    text-align: center;
  }

  .lemon-editor {
    height: 136px;
    line-height: 1.5;
  }
}
</style>
