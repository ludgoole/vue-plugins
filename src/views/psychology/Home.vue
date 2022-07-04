<template>
  <div>
    <ul class="Psychology">
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
  name: 'Psychology',
  data() {
    return {
      images: [
        {
          direction: 'front',
          title: '精神分析',
          color: '#f0c649',
          image:
            'https://img0.baidu.com/it/u=2016100521,2066649154&fm=253&fmt=auto&app=138&f=JPEG?w=352&h=500',
          themes: [
            {
              theme: '人格结构',
              spirits: [
                {
                  consciousness: '信仰',
                  spirit: '神我',
                  principle: '感应',
                  character: '如来',
                  image:
                    'https://img2.baidu.com/it/u=523152376,3214286931&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=394',
                },
                {
                  consciousness: '意识',
                  spirit: '超我',
                  principle: '道德',
                  character: '唐僧',
                  image:
                    'https://img1.baidu.com/it/u=791149965,385391017&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=411',
                },
                {
                  consciousness: '前意识',
                  spirit: '自我',
                  principle: '现实',
                  character: '沙僧',
                  image:
                    'https://img0.baidu.com/it/u=2778949634,2648796345&fm=253&fmt=auto&app=138&f=JPEG?w=502&h=400',
                },
                {
                  consciousness: '社会潜意识',
                  spirit: '他我',
                  principle: '约束',
                  character: '白龙马',
                  image:
                    'https://img1.baidu.com/it/u=2078755832,2228777504&fm=253&fmt=auto&app=138&f=JPEG?w=363&h=331',
                },
                {
                  consciousness: '个人潜意识',
                  spirit: '本我',
                  principle: '快乐',
                  character: '猪八戒',
                  image:
                    'https://img0.baidu.com/it/u=271969968,978969362&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=356',
                },
                {
                  consciousness: '集体潜意识',
                  spirit: '原我',
                  principle: '激活',
                  character: '孙悟空',
                  image:
                    'https://img2.baidu.com/it/u=1453054315,2404510063&fm=253&fmt=auto&app=138&f=JPG?w=640&h=442',
                  prototypes: [
                    {
                      prototype: '天真者',
                      dream: '开开心心',
                      fear: '因为做了坏事或错事而被惩罚',
                      personality: '坚定，乐观，无聊',
                      character: '公孙绿萼',
                      order: 9,
                    },
                    {
                      prototype: '孤儿',
                      dream: '被拥有',
                      fear: '被遗弃或是太突出',
                      personality: '务实的，有同理心，迷失',
                      character: '陆无双',
                      order: 2,
                    },
                    {
                      prototype: '英雄',
                      dream: '专精某个领域来改善这个世界',
                      fear: '因为软弱而被人瞧不起',
                      personality: '能力，勇气，自大',
                      character: '郭靖',
                      order: 1,
                    },
                    {
                      prototype: '照顾者',
                      dream: '帮助他人',
                      fear: '被人冷落或遗忘',
                      personality: '慈悲，慷慨，被剥削',
                      character: '孙婆婆',
                      order: 2,
                    },
                    {
                      prototype: '探险家',
                      dream: '体验更美好，更真实，更充实的生活',
                      fear: '一成不变的生活',
                      personality: '自主，野心，不合群',
                      character: '杨过',
                      order: 3,
                    },
                    {
                      prototype: '反抗者',
                      dream: '推翻不在起效的东西',
                      fear: '无力或是无法产生影响',
                      personality: '无拘束，激进的自由，黑化',
                      character: '黄老邪',
                      order: 6,
                    },
                    {
                      prototype: '情种',
                      dream: '与所爱的人，在所爱的环境中做着爱做的事',
                      fear: '孤独，变成墙头的花，无人采摘也无人爱',
                      personality: '激情，感恩，取悦',
                      character: '郭襄',
                      order: 4,
                    },
                    {
                      prototype: '创造者',
                      dream: '将梦想变为现实',
                      fear: '平庸的梦想，或是平庸的执行力',
                      personality: '创造力，想象力，完美主义',
                      character: '王重阳',
                      order: 1,
                    },
                    {
                      prototype: '小丑',
                      dream: '拥有一段快乐的时光并且点亮这个世界',
                      fear: '感到无聊或让他人无聊',
                      personality: '乐观，开心果，轻浮',
                      character: '周伯通',
                      order: 7,
                    },
                    {
                      prototype: '智者',
                      dream: '运用信息和分析来了解这个世界',
                      fear: '被哄骗或误导',
                      personality: '明智，聪慧，纸上谈兵',
                      character: '黄蓉',
                      order: 5,
                    },
                    {
                      prototype: '魔术师',
                      dream: '让梦想成真',
                      fear: '意外的消极结果',
                      personality: '神秘，双赢，控制欲',
                      character: '霍都',
                      order: 3,
                    },
                    {
                      prototype: '统治者',
                      dream: '创造一个繁荣而成功的家庭或者社区',
                      fear: '混乱，被推翻',
                      personality: '责任感，领导力，独裁',
                      character: '成吉思汗',
                      order: 8,
                    },
                    // '人格面具',
                    // '阴影',
                    // '阿尼玛',
                    // '阿尼姆斯',
                    // '智慧老人',
                    // '英雄',
                  ],
                },
              ],
            },
            {
              theme: '防御机制',
              defences: [
                {
                  defence: '压抑',
                  example: '暂时性失忆',
                },
                {
                  defence: '否认',
                  example: '死鸭子嘴硬',
                },
                {
                  defence: '投射',
                  example: '以小人之心度君子之腹',
                },
                {
                  defence: '置换',
                  example: '人不中用怪刀钝',
                },
                {
                  defence: '反向形成',
                  example: '不要就是要',
                },
                {
                  defence: '合理化',
                  example: '葡萄是酸的',
                },
                {
                  defence: '升华',
                  example: '天才在左，疯子在右',
                },
                {
                  defence: '退行',
                  example: '吓尿了',
                },
              ],
              // 压抑 否认 投射 置换 反向形成 合理化 升华 退行
            },
            {
              theme: '梦的解析',
              encode: ['凝缩', '置换', '象征', '润饰'],
              decode: ['自由联想', '扩充分析', '积极想象'],
              example: {
                dream: `
                  学校举行活动，要去基地参观火箭发射，我们几个来晚了没赶上出行的大巴。
                  我们灵机一动，发现了一根树木，像小舟一样，我们顺势做了上去，抄小路在校园的树林里穿梭着。
                  路好窄，弯弯曲曲，我们费了好大劲才掌握好怎么操作方向，稍微放松了下来。
                  突然，一个女生的声音打断了我们，我们带着她一起出发，一个不小心，装到了围墙上。
                  抬头一看，教导主任正盯着我们，我们赶紧往回跑，一路上哼着小调，有说有笑，似乎是睡着了。
                  等我们醒来的时候，到了学校的操场，那辆大巴车稳稳当当的停在原地。
                `,
                persons: [
                  {
                    keyword: '一行人',
                    association: '同事 一行人乘车去总部出差',
                    encode: '置换',
                  },
                  {
                    keyword: '女生',
                    association: '',
                  },
                  {
                    keyword: '教导主任',
                    association: '高中班主任|老板 平时很严肃',
                    encode: '凝缩',
                  },
                ],
                goods: [
                  {
                    keyword: '学校',
                    association: '',
                  },
                  {
                    keyword: '火箭',
                    association: '烟花 花博汇晚上有烟花',
                    encode: '置换',
                  },
                  {
                    keyword: '大巴',
                    // association: '公交车 多次搭错过公家车',
                  },
                  {
                    keyword: '树木',
                    association: '船 前段时间做过东湖游艇',
                    encode: '置换',
                  },
                  {
                    keyword: '路',
                    association: '小路 工作生活曲折不顺',
                    encode: '象征',
                  },
                ],
                actions: [
                  {
                    keyword: '来晚了',
                    // association: '迟到 考试总担心时间不够',
                  },
                  {
                    keyword: '控制方向',
                    association: '方向盘 出了好几处剐蹭',
                    encode: '置换',
                  },
                  {
                    keyword: '唱歌',
                    // association: '音乐 喜欢边开车边听音乐',
                  },
                  {
                    keyword: '睡觉',
                    association: '最近几天加班多',
                    encode: '置换',
                  },
                ],
                emotions: [
                  {
                    keyword: '紧张',
                    encode: '',
                  },
                  {
                    keyword: '得意',
                    // association: '项目有了突破性的进展',
                  },
                  {
                    keyword: '害怕',
                    association: '',
                  },
                  {
                    keyword: '享受',
                    association: '喜欢自由自在的生活',
                    encode: '象征',
                  },
                  {
                    keyword: '平静',
                    association: '',
                  },
                ],
                target: `
                  1.看到了想看看不到的烟火
                  2.方向盘掌握的更娴熟
                  3.好好睡了一个安稳觉
                  4.体验到了自由自在的生活
                  5.抚慰了曲折受伤的心理
                `,
              },
              // 凝缩 置换 象征 润饰
              // 自由联想 扩充分析 积极想象
            },
          ],
        },
        {
          direction: 'back',
          title: '行为主义',
          color: '#949c97',
          image:
            'https://img2.baidu.com/it/u=3030834705,850539820&fm=253&fmt=auto&app=138&f=JPEG?w=261&h=306',
          themes: [
            {
              theme: '条件反射',
              // ways: ['刺激-反应-奖励-强化', '刺激-反应-惩罚-消退'],
              ways: [
                {
                  way: '刺激',
                  example: '吵架',
                },
                {
                  way: '反应',
                  example: '冷战',
                },
                {
                  way: '奖励',
                  example: '挑毛病',
                },
                {
                  way: '强化',
                  example: '离家出走',
                },
                {
                  way: '惩罚',
                  example: '低头认错',
                },
                {
                  way: '消退',
                  example: '和好如初',
                },
              ],
            },
            {
              theme: '微表情',
              expressions: [
                {
                  expression: '平静',
                  status: '常态',
                  example: '晒太阳',
                },
                {
                  expression: '惊讶',
                  status: '意料之外的事发生',
                  example: '小礼物',
                },
                {
                  expression: '高兴',
                  status: '达成愿望的事发生',
                  example: '约会',
                },
                {
                  expression: '轻蔑',
                  status: '实力碾压的事发生',
                  example: '炫富',
                },
                {
                  expression: '厌恶',
                  status: '不愿面对的事发生',
                  example: '老鼠',
                },
                {
                  expression: '愤怒',
                  status: '看不顺眼的事发生',
                  example: '插队',
                },
                {
                  expression: '恐惧',
                  status: '强力支配的事发生',
                  example: '失业',
                },
                {
                  expression: '悲伤',
                  status: '无能为力的事发生',
                  example: '失恋',
                },
              ],
            },
            {
              theme: '微反应',
              behaviors: [
                {
                  behavior: '安慰反应',
                  status: '不适应，紧张，压力，害怕',
                  action: '扭头，弄头发，摆手势，双手抱胸，抖腿，嚼口香糖',
                },
                {
                  behavior: '逃离反应',
                  status: '厌恶，恐惧',
                  action: '坐立不安，望向出口',
                },
                {
                  behavior: '冻结反应',
                  status: '威胁，悲伤',
                  action: '目光呆滞，面无表情，一动不动',
                },
                {
                  behavior: '战斗反应',
                  status: '警觉，愤怒',
                  action: '瞳孔放大，屏住呼吸，双手握拳',
                },
                {
                  behavior: '胜败反应',
                  status: '放松，喜悦，失落，悲伤',
                  action: '微笑，跳跃，皱眉，沉重',
                },
                {
                  behavior: '爱恨反应',
                  status: '幸福，忌恨',
                  action: '眼神温柔，身体靠近，眼神回避，身体远离',
                },
              ],
            },
            {
              theme: '说谎',
              language: {
                decode: ['强调', '置换', '转移', '隐瞒', '润饰'],
                status: '恐惧感，罪恶感，快慰感',
                lies: [
                  {
                    lie: '重复',
                    decode: '强调',
                    example: '没有，我昨晚没有去过',
                  },
                  {
                    lie: '绝对化',
                    decode: '强调',
                    example: '我绝对没有骗过你',
                  },
                  {
                    lie: '复合主语',
                    decode: '置换',
                    example: '我们都在家里，没去找过他',
                  },
                  {
                    lie: '原因前置',
                    decode: '置换',
                    example: '我刚才在想事情，没听注意看',
                  },
                  {
                    lie: '答非所问',
                    decode: '转移',
                    example: '对了，你不是说要吃蛋糕吗，去哪里？',
                  },
                  {
                    lie: '提问回答',
                    decode: '转移',
                    example: '如果换做你，你会怎么回答？',
                  },
                  {
                    lie: '否定回答',
                    decode: '转移',
                    example: '你非要这么说，我有什么办法',
                  },
                  {
                    lie: '无主语',
                    decode: '隐瞒',
                    example: '最近很忙，要开会，还得陪客户吃饭',
                  },
                  {
                    lie: '口误',
                    decode: '隐瞒',
                    example: '四，是个人都不会做出那种事',
                  },
                  {
                    lie: '过量信息',
                    decode: '润饰',
                    example: '巴拉巴拉...',
                  },
                  {
                    lie: '语音语调',
                    decode: '强调',
                    example: '音调升高，发音延长',
                  },
                ],
              },
              body: [
                {
                  lie: '眉毛',
                  action: '眉毛抬高',
                },
                {
                  lie: '眼睛',
                  action: '瞳孔放大，眼神躲闪，盯着不懂，频繁眨眼',
                },
                {
                  lie: '鼻子',
                  action: '呼吸混乱，抹鼻子',
                },
                {
                  lie: '嘴巴',
                  action: '抿嘴，撇嘴，吐舌头',
                },
                {
                  lie: '脖子',
                  action: '扭脖子，抹脖子，咽口水',
                },
                {
                  lie: '肩膀',
                  action: '耸肩',
                },
                {
                  lie: '腹部',
                  action: '双手交叉，侧身',
                },
                {
                  lie: '腿部',
                  action: '抖动',
                },
                {
                  lie: '双手',
                  action: '摩擦，摆弄头发，把玩小物品',
                },
                {
                  lie: '双脚',
                  action: '轻微挪动，左右摆动',
                },
              ],
            },
          ],
        },
        {
          direction: 'left',
          title: '人本主义',
          color: '#5e90b8',
          image:
            'https://img0.baidu.com/it/u=4002030861,485839289&fm=253&fmt=auto&app=138&f=JPEG?w=309&h=220',
          themes: [
            {
              theme: '需要',
              needs: [
                '生理的需要',
                '安全的需要',
                '社交的需要',
                '尊重的需要',
                '自我实现的需要',
              ],
            },
          ],
        },
        {
          direction: 'right',
          title: '完形主义',
          color: '#9c6680',
          image:
            'https://img1.baidu.com/it/u=2568739847,2051614310&fm=253&fmt=auto&app=138&f=JPEG?w=263&h=257',
          themes: [
            {
              theme: '整体',
              needs: ['错觉', '分块', '脑补'],
            },
          ],
        },
        {
          direction: 'top',
          title: '认知心理学',
          color: '#687fa5',
          image:
            'https://img1.baidu.com/it/u=1169100191,2614681390&fm=253&fmt=auto&app=138&f=JPEG?w=356&h=500',
          themes: [
            {
              theme: '乐观',
              modes: [
                {
                  mode: 'Adversity',
                  translate: '坏事情',
                  example: '孩子考试不好',
                },
                {
                  mode: 'Belief',
                  translate: '想法',
                  examples: [
                    {
                      tag: '永久性',
                      extend: '会一直持续下去',
                      example: '孩子将来没有出息',
                    },
                    {
                      tag: '普遍性',
                      extend: '全面带来影响',
                      example: '孩子什么都做不好',
                    },
                    {
                      tag: '个人性',
                      extend: '原因就是我',
                      example: '我的孩子怎么这么笨',
                    },
                  ],
                },
                {
                  mode: 'Consequence',
                  translate: '后果',
                  examples: [
                    {
                      tag: '永久性',
                      example: '不再过多的关注孩子',
                    },
                    {
                      tag: '普遍性',
                      example: '看不到孩子的其他亮点',
                    },
                    {
                      tag: '个人性',
                      example: '对孩子没有耐心',
                    },
                  ],
                },
                {
                  mode: 'Disputation',
                  translate: '反驳',
                  examples: [
                    {
                      tag: '找证据',
                      example: '不是每次都成绩不好，孩子对运动很感兴趣',
                    },
                    {
                      tag: '找更多可能性',
                      example:
                        '孩子是否发挥失常，老师是否缺乏关注，父母对孩子是否上心',
                    },
                    {
                      tag: '最坏结果',
                      example: '考不上好大学',
                    },
                  ],
                  example: '',
                },
                {
                  mode: 'Energazation',
                  translate: '激发',
                  example:
                    '以后可以多关心鼓励孩子，多花时间陪陪孩子，多挖掘孩子的特长',
                },
              ],
            },
            {
              theme: '发展',
              developments: [
                {
                  development: '婴儿期',
                  cognition: ['手眼协调', '视觉偏好', '抓握反应'],
                },
                {
                  development: '幼儿期',
                },
                {
                  development: '童年期',
                },
                {
                  development: '青春期',
                },
                {
                  development: '青年期',
                },
                {
                  development: '中年期',
                },
                {
                  development: '老年期',
                },
              ],
            },
            {
              theme: '平衡',
              modes: [
                {
                  mode: 'P',
                  translate: '认知的主体',
                  example: '我想保持身材',
                  change: '快乐就好，要什么身材',
                },
                {
                  mode: 'O',
                  translate: '态度的另一个人',
                  example: '听人说吃太多容易长胖',
                  change: '吃一点点就好',
                },
                {
                  mode: 'X',
                  translate: '任意一个对象',
                  example: '这个东西看起来好好吃',
                  change: '这个东西吃起来肯定是酸的',
                },
              ],
            },
          ],
        },
        {
          direction: 'bottom',
          title: '社会心理学',
          color: '#c06b49',
          image:
            'https://img1.baidu.com/it/u=1262916452,969556804&fm=253&fmt=auto&app=120&f=JPEG?w=300&h=444',
        },
      ],
    }
  },
  methods: {
    clickHandler(evt, title, themes) {
      const transform = evt.target.parentNode.computedStyle.transform
      const isHover = transform.includes('150')
      console.log(isHover, title)
      if (isHover && themes) {
        this.$router.push({
          path: '/psychology/branch',
          query: {
            title,
            themes: JSON.stringify(themes),
            allThemes: JSON.stringify(
              this.images.reduce((a, c) => a.concat(c.themes), [])
            ),
          },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.Psychology {
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

.Psychology .in {
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

.Psychology .in img {
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

.Psychology .out {
  position: absolute;
  width: 150px;
  height: 150px;
  overflow: hidden;
  line-height: 150px;
  text-align: center;
  background: rgba(0, 255, 255, 1);
  transition: all 1s;
}

.Psychology .out img {
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
.Psychology:hover .out-front {
  transform: translateZ(150px);
}

.Psychology:hover .out-back {
  transform: translateZ(-150px);
}

.Psychology:hover .out-left {
  transform: rotateY(90deg) translateZ(150px);
}

.Psychology:hover .out-right {
  transform: rotateY(-90deg) translateZ(150px);
}

.Psychology:hover .out-top {
  transform: rotateX(90deg) translateZ(150px);
}

.Psychology:hover .out-bottom {
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
