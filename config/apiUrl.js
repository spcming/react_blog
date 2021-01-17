let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList: ipUrl + 'getArticleList', // 首页接口
    getArticleById: ipUrl + 'getArticleById/',  // 详情页接口
    getTypeInfo: ipUrl + 'getTypeInfo', // 获取文章类型
    getListById: ipUrl + 'getListById/' // 根据ID获取文章列表
}

export default servicePath