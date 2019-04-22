const mobx = require('../libs/wechat-weapp-mobx/mobx')
const extendObservable = mobx.extendObservable
const http = require('../utils/http.js')
const EvnConst = require('../configs/EvnConst.js')
const ApiConst = require('../configs/ApiConst.js')

const DOMAIN = EvnConst.default.apiHost
const homeStore = function() {
    extendObservable(this, {
        wallpaperDataColum: {//小图数据
            list: [],
            total: 0,
            more: true,
            pageNo: 1
        },
        wallpaperDataDetail: {//详情数据
            list: [],
            total: 0,
            more: true,
            pageNo: 1
        },
        keyword:'当下流行',
        getWallpapperList(params = {}) {
            let {
                pageNo = this.wallpaperDataColum.pageNo , pageSize=33,
            } = params
            return new Promise((r, j) => {
                http.get(DOMAIN + ApiConst.default.LV1_CATEGORY,{pageNo,pageSize,'keyword':this.keyword}).then(result => {
                        if (pageNo === 1) {
                            this.wallpaperDataColum = {
                                list:result.list,
                                total: result.total,
                                more: result.more,
                                pageNo: pageNo + 1
                            }
                        }else{
                            this.wallpaperDataColum.list =  this.wallpaperDataColum.list.concat(result.list);
                            this.wallpaperDataColum.total = result.total;
                            this.wallpaperDataColum.more = result.more;
                            this.wallpaperDataColum.pageNo = pageNo + 1;
                        }
                    r(result);
                });
            })
           
        },
        downLoadSuccess( wpId ){
            http.post(DOMAIN + ApiConst.default.WALLPAPERS_DOWNLOAD,{ 'id':wpId } ).then(result => {
                console.log('result',result);
                this.wallpaperStat = {
                    "totalDownloadCnt": this.wallpaperStat.totalDownloadCnt-0+1
                }
            });
        }

        
    })
}

module.exports = homeStore