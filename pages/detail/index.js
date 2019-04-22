const observer = require("../../libs/wechat-weapp-mobx/observer").observer;
const App = getApp();
const images = [
    '../../images/prayImgs/pray1.png',
    '../../images/prayImgs/pray2.png',
    '../../images/prayImgs/pray3.png',
    '../../images/prayImgs/pray4.png',
    '../../images/prayImgs/pray5.png',
    '../../images/prayImgs/pray6.png',
    '../../images/prayImgs/pray7.png',
    '../../images/prayImgs/pray8.png',
    '../../images/prayImgs/pray9.png',
    '../../images/prayImgs/pray10.png',
    '../../images/prayImgs/pray11.png',
    '../../images/prayImgs/pray12.png',
    '../../images/prayImgs/pray13.png',
    '../../images/prayImgs/pray14.png',
    '../../images/prayImgs/pray15.png',
    '../../images/prayImgs/pray16.png',
    '../../images/prayImgs/pray17.png',
    '../../images/prayImgs/pray18.png',
    '../../images/prayImgs/pray19.png',
    '../../images/prayImgs/pray20.png',
    '../../images/prayImgs/pray21.png',
    '../../images/prayImgs/pray22.png',
    '../../images/prayImgs/pray23.png',
    '../../images/prayImgs/pray24.png',
    '../../images/prayImgs/pray25.png',
    '../../images/prayImgs/pray26.png',
    '../../images/prayImgs/pray27.png',
    '../../images/prayImgs/pray28.png',
    '../../images/prayImgs/pray29.png',
    '../../images/prayImgs/pray30.png',
    '../../images/prayImgs/pray31.png',
    '../../images/prayImgs/pray32.png',
    '../../images/prayImgs/pray33.png',
    '../../images/prayImgs/pray34.png',
    '../../images/prayImgs/pray35.png',
    '../../images/prayImgs/pray36.png',
    '../../images/prayImgs/pray37.png',
    '../../images/prayImgs/pray38.png',
    '../../images/prayImgs/pray39.png',
    '../../images/prayImgs/pray40.png',
];
// pages/home.js
Page(observer({
    props: {
        homeStore: require("../../store/index.js").homeStore,
    },
    data: {
        imgUrl:'',
        flag:false
    },
    onShareAppMessage() {
        let n =0;
        let m =3;
        let a =  Math.floor(Math.random() * (m - n)) + n;
        let title = App.globalData.shareTitles[a];
        let image = '../../images/shareImgs/share.png';
        return {
            title:title,
            imageUrl: image,
            path:'/pages/home/index'
        }
    },
    /* 页面渲染完成钩子 */
    onLoad() {
        wx.showToast({
            title: "正在生成",
            duration: 2e4,
            icon: "loading"
        })
        this.getImg();
    },
    getImg(){
        if(this.data.flag){
            return;
        }
        this.data.flag = true;
        wx.showToast({
            title: "正在生成",
            duration: 2e4,
            icon: "loading"
        })
        const n = 0;
        const m = 39;
        let a =  Math.floor(Math.random() * (m - n)) + n;
        const _this = this;
        wx.getSystemInfo({
            success(res){
                let bgPicturePath = images[a]
                let qrPicturePath= '../../images/evm.png'
                const ctx = wx.createCanvasContext('qrCanvas')
                let width = res.windowWidth
                let height = res.windowWidth*(756/532)
                ctx.drawImage(bgPicturePath, 0, 0, width, height)
                ctx.setFillStyle('#FFBC00')//填充白色
                let evm_w = width * (0.22);
                ctx.fillRect(evm_w/(2), height-evm_w-(evm_w/2.5), evm_w , evm_w )//坐标x:0,y:height-60 宽高。。。
                ctx.drawImage(qrPicturePath, evm_w/(2), height-evm_w-(evm_w/2.5) , evm_w, evm_w)
                ctx.draw(true,function(){
                    wx.canvasToTempFilePath({
                        canvasId: 'qrCanvas',
                        x: 0,
                        y: 0,
                        width: width,
                        height: height,
                        destWidth: width*res.pixelRatio,
                        destHeight: height*res.pixelRatio,
                        success: function (ress) {
                            wx.hideToast();
                            _this.setData({
                                imgUrl:ress.tempFilePath,
                                flag:false
                            })
                        },
                        fail(err){
                            console.log(err);
                        }
                    })
                })
            }
        })
    },
    _tapDownload(e) {
        let url = this.data.imgUrl;
        wx.showLoading({
            title: '正在下载...',
            mask: true
        })
        wx.getImageInfo({
            src: url,
            success(res) {
                wx.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success(res) {
                        wx.showToast({
                            title: "下载完成"
                        })
                    },
                    fail(err) {
                        wx.showToast({
                            title: "下载失败",
                            image: '../../images/download_fail_white.png',
                        })
                        //  console.log('err-----------', err)
                    }
                })
            },
            fail(err) {
                console.log('err-----------',err)
                wx.showToast({
                    title: "下载失败",
                    image: '../../images/download_fail_white.png',
                })
            }
        })
    },

    _tapPreview(e) {
        wx.previewImage({
            urls: [this.data.imgUrl]
        })
    },
    _redirectH5(){
        wx.navigateToMiniProgram({
            appId:'wxf3f963b724069c29',
            success(){
                console.log('打开成功')
            }
        })
    },
    /* 页面卸载钩子 */
    onUnload() {},
}))