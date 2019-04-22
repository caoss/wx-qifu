const observer = require("../../libs/wechat-weapp-mobx/observer").observer;
const App = getApp()
// pages/home.js
Page(observer({
    props: {
        homeStore: require("../../store/index.js").homeStore,
    },
    data: {
        loadStatus: 'loading',
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
    onLoad(data) {
        const {
            homeStore
        } = this.props
    },
    /* 页面卸载钩子 */
    onUnload() {},
  
    _loadMoreWallPaper() {
        const n = 0;
        const m = 39;
        let a =  Math.floor(Math.random() * (m - n)) + n;
        console.log(a);
    },
    _toDetail(){
        wx.navigateTo({
            url: '../detail/index'
        })
    },
    redirect_neets(){
        wx.navigateToMiniProgram({
            appId:'wxf3f963b724069c29',
            success(){
                console.log('打开成功')
            }
        })
    }
}))