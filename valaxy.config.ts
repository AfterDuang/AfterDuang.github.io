import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'
import { addonWaline } from 'valaxy-addon-waline'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts
  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '柚叶的垃圾桶',
      cloud: {
        enable: true,
      },
    },

    bg_image: {
      /**
       * @en Enable background image
       */
      enable: true,
      /**
       * @en Image url
       */
      url: 'https://cdn.jsdelivr.net/gh/YunYouJun/cdn/img/bg/stars-timing-0-blur-30px.jpg',
      /**
       * @en Image url when dark mode
       */
      dark: '/images/Bg_Dark.jpg',
      /**
       * @en Image opacity
       */
      opacity: 1,
    },

    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '喜欢的女孩子',
        url: '/girls/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
      {
        name: '好用的网站',
        url: '/myweb/',
        icon: 'i-ri-cloud-line',
        color: 'orange',
      },
    ],

    footer: {
      since: 2016,
      beian: {
        enable: false,
        icp: '苏ICP备17038157号',
      },
    },
  },

  unocss: { safelist },

  addons: [
    addonWaline({
      serverURL: 'https://waline-blog-pinlun.vercel.app/',
    }),
  ],
  
  

})

