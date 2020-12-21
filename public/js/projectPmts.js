var projectPmts = (function (){
    var cloudlinkUrl = getUrl('freedo');
    function getDongZhan(callback){
        $http.post(cloudlinkUrl + "/cloudlink/cloudlink-core-framework/login/login", {
            appId: "0154981b-11c5-49ad-839d-a3420af507d8",
            loginNum: "13691252190",
            password: "e10adc3949ba59abbe56e057f20f883e"
        }).then((res)=>{
            $http.post(cloudlinkUrl + "/cloudlink/freeserver-ocelot/services/scene/getall?token=" + res.data.token, {
                pagecount: 200
            }).then((res2)=>{
                let getAll = res2.data;
                if(getAll.stat === 0){
                    for(let i in getAll.val){
                        if("CQ_Dongzhan_newmax" === getAll.val[i].name){
                            callback(getAll.val[i].detail.pmts);
                        }
                    }
                }
            });
        })
    }
    return {
        getPmts: getDongZhan
    }
})();

var init3D = function() {
    // 初始化三维引擎
    window.viewer = Freedo.FdApp.createDefaultViewer(
        "freedoContainer", {}, {
            showMouseCenterIcon: true, // 显示鼠标中心图标
            hasProvinceBoundaries: true // 显示中国省界
        }
    );
    // var viewSwitcher = new Freedo.FdTools.FdViewSwitcher(viewer);
    // viewSwitcher.start('MODEL_VIEW');

    // 去掉水印
    viewer.showLogo = false;

    // 显示导航器
    viewer.extend(Freedo.FdTools.FdNavigationMixin, {
        enableCompass: true,
        enableZoomControls: false,
        enableDistanceLegend: false,
        enableCompassOuterRing: true
    });

    // 定位相机位置到重庆市
    var cameraInfo = [106.670577, 29.470927, 1377.87, 338.236073, -29.649286, 359.929695];
    Freedo.FdCamera.goToByCameraInfo(viewer.scene.camera, cameraInfo);

    // 添加地形高程
    var terrainManager = new Freedo.FdTools.FdTerrain(viewer);
    terrainManager.setTerrain("//terrain.gbim360.com/", "STK");

    // 添加默认影像图层
    var imageryManager = new Freedo.FdTools.FdImageryLayersManager(viewer);
    // imageryManager.addDefaultImageryLayer();
    var imageryOptions = {
        "name": "天地图全球影像服务",
        "type": "WMTS",
        "iconUrl": "//res.gbim360.com/lib/freedo/rel/1.5.8/Freedo/Widgets/Images/ImageryProviders/blackMarble.png",
        "layerOption": {
            "show": true,
            "alpha": 1.0
        },
        "providerOptions": {
            "url": "//{s}.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=6ac0730ef5e5d74b5aa65e408896e182",
            "layer": "img",
            "style": "default",
            "format": "tiles",
            "tileMatrixSetID": "c",
            "subdomains": ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            "maximumLevel": 18,
            "tileMatrixLabels": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
            "tilingScheme": "Geographic",
            "tileDiscardPolicy": {
                "missingImageUrl": "//t0.tianditu.com/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix=19&TileRow=0&TileCol=0&style=default&format=tiles&tk=6ac0730ef5e5d74b5aa65e408896e182",
                "pixelsToCheck": [
                    [0, 0],
                    [120, 140],
                    [130, 160],
                    [200, 50],
                    [200, 200]
                ],
                "disableCheckIfAllPixelsAreTransparent": true
            }
        }
    }
    imageryManager.add(imageryOptions, imageryManager.length);
}