//app.js
const observer = require('./libs/wechat-weapp-mobx/observer').observer
const http = require('./utils/http.js')

App(
    observer({
        props: {
            homeStore: require('./store/index.js').homeStore
        },
        onLaunch: function() {
        },
        userData: {
        },
        globalData: {
            appIds:[
                "wxf3f963b724069c29",//壁纸
                "wx5862aca4afa95ef4",//GIF
                "wx835231fcea421e75",//新年头像
                "wx3dce3323eec3c8b1",//韩剧
                "wx77cf03d4e4fdfa13",//符
            ],
            shareTitles:[
                '2019我要转运，水逆退散',
                '2019 暴富！',
                '2019锦鲤附体！好运连连！'
            ]
        }
    })
)