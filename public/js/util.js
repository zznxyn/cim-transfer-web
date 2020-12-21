var urlArray = [{
    "name": "CIM网关",
    "til": "cim",
    "url": "http://192.168.0.115:9000"
}, {
    "name": "飞渡服务",
    "til": "freedo",
    "url": "http://192.168.0.52:82"
}, {
    "name": "总览页面",
    "til": "cim-0.1",
    "url": "http://192.168.0.56:8000"
}, {
    "name": "自定义影像",
    "til": "imagery",
    "url": ""
}, {
    "name": "自定义地形",
    "til": "terrain",
    "url": ""
}];

function getUrl(til) {
    for (var i = 0; i < urlArray.length; i++) {
        if (urlArray[i].til === til) {
            return urlArray[i].url;
        }
    }
    return '';
}
window.gatewayUrl = getUrl("cim");

function redirectFreedo(){
    localStorage.setItem('role', '');
    window.location.href = getUrl('cim-0.1');
}

function matchType(fileName) {
    // 后缀获取
    let suffix = ''
    // 获取类型结果
    let result
    try {
        const fileArr = fileName.split('.')
        suffix = fileArr[fileArr.length - 1].toLowerCase()
    } catch (err) {
    }
    // fileName无后缀返回 false
    if (!suffix) {
        return false
    }
    // 图片格式
    const imgList = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'svg', 'icon', 'ico']
    // 进行图片匹配
    result = imgList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'image'
    }
    // 匹配txt
    const txtList = ['txt']
    result = txtList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'txt'
    }
    // 匹配 excel
    const excelList = ['xls', 'xlsx']
    result = excelList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'excel'
    }
    // 匹配 word
    const wordList = ['doc', 'docx']
    result = wordList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'word'
    }
    // 匹配 pdf
    const pdfList = ['pdf']
    result = pdfList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'pdf'
    }
    // 匹配 ppt
    const pptList = ['ppt', 'pptx']
    result = pptList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'ppt'
    }
    // 匹配 视频
    const videoList = ['mp4', 'm2v', 'mkv']
    result = videoList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'video'
    }
    // 匹配 音频
    const radioList = ['mp3', 'wav', 'wmv']
    result = radioList.some(function(item) {
        return item === suffix
    })
    if (result) {
        return 'radio'
    }
    // 其他 文件类型
    return 'other'
}
