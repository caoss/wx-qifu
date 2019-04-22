const observer = require("../../libs/wechat-weapp-mobx/observer").observer;
// pages/home.js
Page(observer({
    props: {
        homeStore: require("../../store/index.js").homeStore,
    },
    data: {
        imgUrl:''
    },
    onShareAppMessage() {
        let title ='好玩的斗图神器，海量GIF表情包';
        let image = '../../images/shareImgs/share.jpeg';
        return {
            title:title,
            imageUrl: image
        }
    },
    /* 页面渲染完成钩子 */
    onLoad() {
    //   var a = this.getRandom();
    //     this.setData({
    //         imgUrl:'../../images/prayImgs/pray2.png'
    //     })
        wx.getSystemInfo({
            success(res){
                console.log(res)
                let bgPicturePath = '../../images/prayImgs/pray2.png'
                let qrPicturePath= '../../images/evm.jpg'
                const ctx = wx.createCanvasContext('qrCanvas')
                let width = res.windowWidth
                let height = res.windowWidth*(756/532)
                ctx.drawImage(bgPicturePath, 0, 0, width, height)
                
                ctx.setFillStyle('white')//填充白色

                let evm_w = width * (0.22);
                ctx.fillRect(evm_w/(2), height-evm_w-(evm_w/2.5), evm_w , evm_w )//坐标x:0,y:height-60 宽高。。。
                ctx.drawImage(qrPicturePath, evm_w/(2), height-evm_w-(evm_w/2.5) , evm_w, evm_w)
                ctx.draw(true,function(){
                    wx.canvasToTempFilePath({
                        canvasId: 'qrCanvas',
                        success: function (ress) {
                          console.log(ress)
                        },
                        fail(err){
                            console.log(err);
                        }
                    })
                })
            }
        })

    },
    getRandom(){
        const n = 0;
        const m = 24;
        var a =  Math.ceil(Math.random()*(n+1-m)+m);
        console.log(a);
        return a;
    },
    /* 页面卸载钩子 */
    onUnload() {},
}))