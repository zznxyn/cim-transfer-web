/**
 * 三维控件
 */
class BimMap {
    /**
     * 初始化
     * @param {string=} containerId
     */
    constructor(containerId) {
        this.param = {
            // 地图显示容器
            containerId: containerId,

            // 场景类型 1:地球，0:普通，-1:已卸载
            sceneType: -1,

            // 场景光照,0：关闭,1-2：逐渐加强
            light: 1,

            // 拾取模式
            pickMode: 0,

            // 拾取激活模式
            clickMode: BcEngineX.ScreenSpaceEventType.LEFT_CLICK,

            // 选择集变化后立即更新
            // 当前选中模型
            currentSelectionTag: "",
            // 当前选择集
            currentSelectionSet: "",

            // 场景id
            sceneId: "",

            // 已加载的场景视点id
            sceneViewPortArr: [],

            // 模型集合
            modelLayers: [],

            // 参数化模型绑定事件
            labelEventMap: {},

            // 标签集合
            labelMap: new Map(),

            // 自定义DIV标签集合
            divLabels: {},

            // 自定义DIV标签移动状态
            divIsMoving: false,

            // 默认天空盒
            defaultSkyBox: undefined,
            // 自定义天空盒
            groundSkyBox: undefined,
            // 内置天空盒
            skyBox: {
                blueSky: {
                    positiveX: ctx + 'BcEngineX/SkyBox/blueSky/px.jpg',
                    negativeX: ctx + 'BcEngineX/SkyBox/blueSky/nx.jpg',
                    positiveY: ctx + 'BcEngineX/SkyBox/blueSky/py.jpg',
                    negativeY: ctx + 'BcEngineX/SkyBox/blueSky/ny.jpg',
                    positiveZ: ctx + 'BcEngineX/SkyBox/blueSky/pz.jpg',
                    negativeZ: ctx + 'BcEngineX/SkyBox/blueSky/nz.jpg',
                },
                sky00: {
                    positiveX: ctx + 'BcEngineX/SkyBox/Sky_00/px.jpg',
                    negativeX: ctx + 'BcEngineX/SkyBox/Sky_00/nx.jpg',
                    positiveY: ctx + 'BcEngineX/SkyBox/Sky_00/py.jpg',
                    negativeY: ctx + 'BcEngineX/SkyBox/Sky_00/ny.jpg',
                    positiveZ: ctx + 'BcEngineX/SkyBox/Sky_00/pz.jpg',
                    negativeZ: ctx + 'BcEngineX/SkyBox/Sky_00/nz.jpg',
                },
                sky01: {
                    positiveX: ctx + 'BcEngineX/SkyBox/Sky_01/px.jpg',
                    negativeX: ctx + 'BcEngineX/SkyBox/Sky_01/nx.jpg',
                    positiveY: ctx + 'BcEngineX/SkyBox/Sky_01/py.jpg',
                    negativeY: ctx + 'BcEngineX/SkyBox/Sky_01/ny.jpg',
                    positiveZ: ctx + 'BcEngineX/SkyBox/Sky_01/pz.jpg',
                    negativeZ: ctx + 'BcEngineX/SkyBox/Sky_01/nz.jpg',
                },
                sky06: {
                    positiveX: ctx + 'BcEngineX/SkyBox/Sky_06/px.jpg',
                    negativeX: ctx + 'BcEngineX/SkyBox/Sky_06/nx.jpg',
                    positiveY: ctx + 'BcEngineX/SkyBox/Sky_06/py.jpg',
                    negativeY: ctx + 'BcEngineX/SkyBox/Sky_06/ny.jpg',
                    positiveZ: ctx + 'BcEngineX/SkyBox/Sky_06/pz.jpg',
                    negativeZ: ctx + 'BcEngineX/SkyBox/Sky_06/nz.jpg',
                },
                sky07: {
                    positiveX: ctx + 'BcEngineX/SkyBox/Sky_07/px.jpg',
                    negativeX: ctx + 'BcEngineX/SkyBox/Sky_07/nx.jpg',
                    positiveY: ctx + 'BcEngineX/SkyBox/Sky_07/py.jpg',
                    negativeY: ctx + 'BcEngineX/SkyBox/Sky_07/ny.jpg',
                    positiveZ: ctx + 'BcEngineX/SkyBox/Sky_07/pz.jpg',
                    negativeZ: ctx + 'BcEngineX/SkyBox/Sky_07/nz.jpg',
                },
                sky09: {
                    positiveX: ctx + 'BcEngineX/SkyBox/Sky_09/px.jpg',
                    negativeX: ctx + 'BcEngineX/SkyBox/Sky_09/nx.jpg',
                    positiveY: ctx + 'BcEngineX/SkyBox/Sky_09/py.jpg',
                    negativeY: ctx + 'BcEngineX/SkyBox/Sky_09/ny.jpg',
                    positiveZ: ctx + 'BcEngineX/SkyBox/Sky_09/pz.jpg',
                    negativeZ: ctx + 'BcEngineX/SkyBox/Sky_09/nz.jpg',
                }
            }
        };
        this.engine = {
            scene: void 0,
            viewer: void 0,
        };
    };

    /**
     * 创建地球场景
     * @param {{}=} option
     */
    createEarthScene(option) {
        // 地球场景
        this.param.sceneType = 1;

        // 初始化参数
        let defaultOption = {
            terrainEnable: true,
            imageryOption: 'google', // 可选: 'google', 'tianditu', {//自定义}
            skyBox: this.param.skyBox.blueSky,
        };
        if (typeof option === "undefined") {
            option = {};
        }
        option = Object.assign(defaultOption, option);

        // 初始化三维引擎
        let scene = BcEngineX.createBcScene(this.param.containerId, {type: 0});
        let viewer = scene._viewer;

        // 删除水印
        scene._scene.primitives.remove(scene._bcLogo);
        scene.setAccess = function () {};
        // 隐藏导航栏
        scene.setNavigationVisibility(false);

        // 初始化控件模块
        this.engine.scene = scene;
        this.engine.viewer = viewer;
        this.engine.plotLayer = scene.plotManager.getLayer();

        // 添加地形高程
        if (option.terrainEnable) {
            viewer.terrainProvider = new BcEngineX.CesiumTerrainProvider({
                url: 'http://terrain.gbim360.com',
            });
        }

        // 设置天空盒
        this.param.defaultSkyBox = this.engine.scene._scene.skyBox;
        setTimeout(()=>{
            this.setSkyBox(option.skyBox);
        }, 6000);

        // 添加影像图层
        if (option.imageryOption) {
            let imageryProvider = void 0;
            if (option.imageryOption.constructor === String) {
                switch (option.imageryOption) {
                    case 'google':
                        imageryProvider = new BcEngineX.UrlTemplateImageryProvider({
                            url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali",
                            maximumLevel: 18,
                        });
                        break;
                    case 'tianditu':
                        imageryProvider = new BcEngineX.WebMapTileServiceImageryProvider({
                            url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
                            maximumLevel: 18,
                            layer: "tdtBasicLayer",
                            style: "default",
                            format: "image/jpeg",
                            tileMatrixSetID: "GoogleMapsCompatible",
                            show: false
                        });
                        break;

                    default:
                        break;
                }
            } else if (option.imageryOption.constructor === Object) {
                imageryProvider = option.imageryOption;
            }
            // 加载自定义影像图层
            if (imageryProvider) {
                viewer.imageryLayers.addImageryProvider(imageryProvider);
                viewer.imageryLayers.addImageryProvider2 = viewer.imageryLayers.addImageryProvider;
                viewer.imageryLayers.addImageryProvider = () => {
                };
            }
        }

        // 初始化事件监听
        this.initEvent();

        // 重写部分方法
        this.override();
    };

    /**
     * 初始化事件监听
     */
    initEvent() {
        // 键盘事件

        // 视点变更事件
        this.engine.viewer.camera.changed.addEventListener(() => {
            if (!this.param.divIsMoving) {
                this.param.divIsMoving = true;
                // setTimeout(() => {
                Object.keys(this.param.divLabels).forEach(id => {
                    this.updateModelPosition(id);
                });
                this.param.divIsMoving = false;
                // });
            }
        });

        // 鼠标左键单击事件
        this.engine.viewer.screenSpaceEventHandler.setInputAction((movement) => {
            // 拾取世界坐标
            let wcs = this.engine.viewer.scene.pickPosition(movement.position);
            if (!wcs) return;
            let position = this.engine.scene.wcs2gcs(wcs);
            Hook.run("LeftClick", position, movement.position);
        }, BcEngineX.ScreenSpaceEventType.LEFT_CLICK);

        // 参数化模型选中事件

        // 模型加载事件
        this.engine.scene.modelLayerManager.layerAdded.addEventListener((layer) => {
            // Hook.run("PModelLoaded", layer.id);
        });

        // 部件选中事件
        this.engine.scene.pickObjectEvent.addEventListener((info, position) => {
            if (info.key) {
                let modelLayer = this.getAllPmts().filter(ml => ml._typeLayer === info.layer);
                let component = {
                    componentid: info.key,
                    modelFileId: modelLayer.length > 0 ? modelLayer[0].id : '',
                }
                Hook.run("PickComponent", component);
            }
        });

        // 天空盒置换
        let _scene = this.engine.scene._scene;
        _scene.postRender.addEventListener(() => {
            if (!this.param.groundSkyBox) {
                return;
            }
            var e = this.engine.scene._viewer.camera.position
            if (BcEngineX.Cartographic.fromCartesian(e).height < 50000) {
                _scene.skyAtmosphere.show = false;
                _scene.skyBox = this.param.groundSkyBox
            } else {
                _scene.skyAtmosphere.show = true;
                _scene.skyBox = this.param.defaultSkyBox
            }
        });
    };

    /**
     * 重写方法
     */
    override() {
        let that = this;
        let scene = this.engine.scene;
        this.engine.scene.setPickEnable = function (e) {
            scene._pickEnable = e;
            scene._screenSpaceEventHandler.removeInputAction(that.param.clickMode);
            scene._pickEnable && this._screenSpaceEventHandler.setInputAction(scene.pick.bind(scene), that.param.clickMode);
        }
    };

    /**
     * 销毁场景
     */
    destroy() {
        this.removeAllPmts();
        if (this.engine.scene) {
            this.engine.scene.destroy();
        }
    };

    /**
     * 设置天空盒
     */
    setSkyBox(box) {
        this.param.groundSkyBox = new BcEngineX.GroundSkyBox({
            sources: box
        });
    };

    /**
     * 获取pmts的配置信息
     * @param id pmtsId
     */
    getPmts(id) {
        for (let i = 0; i < this.param.modelLayers.length; i++) {
            if (this.param.modelLayers[i].id === id) {
                return this.param.modelLayers[i];
            }
        }
        return undefined;
    };

    /**
     * 添加模型
     */
    addPmts(pmts) {
        if (!pmts.useMatrix) {
            pmts.modelMatrix = undefined;
        }
        let modelLayer = this.engine.scene.modelLayerManager.addLayer(pmts);
        modelLayer.id = pmts.id;
        this.param.modelLayers.push(modelLayer);

        // 模型索引文件加载完成
        if (modelLayer.loadedEvent) {
            modelLayer.loadedEvent.addEventListener((layer) => {
                // console.log('loadedEvent:', layer);
            });
        }
        // 图层模型数据即将渲染时
        if (modelLayer.modelReadyEvent) {
            modelLayer.modelReadyEvent.addEventListener((layer) => {
                // console.log('modelReadyEvent:', layer);
                if (pmts.autoFlyto) {
                    this.fly2Model(modelLayer.id);
                }
                Hook.run("PModelLoaded", layer.id);
            });
        }
        // 图层移出事件
        if (modelLayer.unLoadedEvent) {
            modelLayer.unLoadedEvent.addEventListener((layer) => {
                // console.log('unLoadedEvent:', layer);
            });
        }
        return modelLayer.id;
    };

    /**
     * 获取pmts的配置信息
     */
    getAllPmts() {
        return this.param.modelLayers;
    };

    /**
     * 删除所有模型
     */
    removeAllPmts() {
        if (this.engine.scene) {
            let modelLayers = this.param.modelLayers;
            if (modelLayers.length > 0) {
                // 移除模型
                for (let i = 0; i < modelLayers.length; i++) {
                    this.engine.scene.modelLayerManager.remove(modelLayers[i]);
                }
                this.param.modelLayers = [];
            }
        }
    };

    /**
     * 显隐所有模型
     * @param {boolean} show 是否显示
     * @param {string|string[]=} filter 要排除的pmtsId
     */
    showAllPmts(show, filter) {
        if (typeof filter === 'undefined' || !filter) {
            filter = [];
        } else if (filter.constructor !== Array) {
            filter = [filter];
        }
        this.param.modelLayers.forEach(modelLayer => {
            modelLayer.isShow = filter.indexOf(modelLayer.id) > -1 ? !show : show;
        });
    };

    /**
     * 获取模型矩阵
     * @param id 模型ID
     * @returns {*}
     */
    getModelMatrix(id) {
        return Object.values(this.getPmts(id).modelMatrix);
    }

    /**
     * 设置模型矩阵
     * @param id 模型ID
     * @param modelMatrix 模型矩阵
     */
    setModelMatrix(id, modelMatrix) {
        let matrixObject = {};
        modelMatrix.forEach((value, index) => {
            matrixObject[index] = value
        })
        this.getPmts(id).modelMatrix = matrixObject;
    }

    /**
     * 获取模型中心点
     * @param id 模型ID
     * @returns {*} 世界坐标
     */
    getModelCenter(id) {
        return this.getPmts(id).boundingSphere.center;
    }

    /**
     * 模型定位
     */
    fly2Model(id) {
        this.engine.scene.fly2front(this.getPmts(id), {
            // heading: -90,
            pitch: -180,
            roll: 45,
            rangeFactor: 2
        });
    }

    /**
     * 添加参数化建模
     * @param type {string} 类型
     * @param option {{}} 参数
     * @param id {string=} 可选，若无则自动创建
     */
    addModel(type, option, id) {
        let guid = '';
        let rmcb = undefined;
        switch (type) {
            case 'Label':
                guid = this.engine.plotLayer.appendDynamicBillboardPlot(option);
                rmcb = this.engine.plotLayer.addEventListener(guid, (eventType, pt, isBackFace) => {
                    if (eventType === 'click') {
                        Hook.run("EntityClick", {
                            id: guid,
                            type: type
                        });
                    }
                });
                id = option.id ? option.id : guid;
                this.param.labelMap.set(id, guid);
                guid = id;
                break;
            case 'DivLabel':
                // {
                //     show: true,
                //     position: this.tool.tc([106, 29, 100]),
                //     minDistance: 0,
                //     maxDistance: 100000,
                //     divId: "",
                // };
                guid = option.id || id || this.tool.guid();
                option.id = guid;
                option.minDistance = option.minDistance || 0;
                option.dom = document.getElementById(option.divId);
                option.show = typeof option.show === 'undefined' ? true : option.show;
                this.param.divLabels[guid] = option;
                this.updateModelPosition(guid);
                break;
            case 'Polygon':
                option.fillColor = "rgba(" + option.fillColor.join(',') + ")";
                option.positions = option.pts;
                guid = this.engine.scene.geometryDrawHelper.addPolygon(option);
                break;
            default:
                break;
        }
        this.param.labelEventMap[guid] = {
            type,
            removeEvent: rmcb
        };
        return guid;
    };

    /**
     * 显隐标签
     * @param {string} id 标签ID
     * @param {boolean} show 是否显示
     */
    showModel(id, show) {
        let label = this.param.labelEventMap[id];
        if ("DivLabel" === label.type) {
            this.param.divLabels[id].show = show;
            this.param.divLabels[id].dom.style.display = show ? 'block' : 'none';
        } else if (["Label"].indexOf(label.type) > -1) {
            this.engine.plotLayer.setShowPlot(show, this.param.labelMap.get(id));
        } else if (["Polygon"].indexOf(label.type) > -1) {

        }
    };

    /**
     * 删除标签
     * @param id
     */
    removeModel(id) {
        let label = this.param.labelEventMap[id];
        if ("DivLabel" === label.type) {
            this.showModel(id, false);
            delete this.param.divLabels[id];
        } else if (["Label"].indexOf(label.type) > -1) {
            this.engine.plotLayer.removeDynamicPlot(this.param.labelMap.get(id));
            label.removeEvent();
        } else if (["Polygon"].indexOf(label.type) > -1) {
            this.engine.scene.geometryDrawHelper.removeEntityByGuid(id);
        }
        delete this.param.labelEventMap[id];
    };

    /**
     * 更新标签位置
     * @param {string} id 标签ID
     * @param {{}=} position2 世界坐标
     */
    updateModelPosition(id, position2) {
        let label = this.param.divLabels[id];
        let dom = label.dom;
        if (!dom) {
            return;
        }
        try {
            let cameraPosition = this.engine.viewer.camera.position;
            if (position2) {
                label.position = position2;
            }
            let position = this.wcs2scc(label.position);
            dom.style.left = position.x + 'px';
            dom.style.top = position.y + 'px';
            if (label.show) {
                let distance = this.getSpaceDistance([cameraPosition, label.position]);
                distance = Math.round(distance);
                if (!label.maxDistance || (label.minDistance <= distance && distance < label.maxDistance)) {
                    dom.style.display = 'block';
                    dom.style.zIndex = 2147483647 - distance;
                } else {
                    dom.style.display = 'none';
                }
            }
        } catch (e) {
            dom.style.display = 'none';
        }
    };

    /**
     * 屏幕截图
     */
    captureScreen(width, height, fullScreen, callback) {
        let base64 = this.engine.scene.getScreenBase64();
        callback('data:image/png;base64,' + base64);
    };

    /**
     * 获取当前视点
     */
    getCurrentCameraInfo() {
        let cameraInfo = this.engine.scene.getCameraInfo();
        let gcs = this.tool.tg({
            x: cameraInfo[0],
            y: cameraInfo[1],
            z: cameraInfo[2],
        });
        cameraInfo[0] = gcs[0];
        cameraInfo[1] = gcs[1];
        cameraInfo[2] = gcs[2];
        return cameraInfo;
    };

    /**
     * 设置当前视点
     */
    setCurrentCameraInfo(cameraInfo, duration) {
        if (typeof cameraInfo === 'undefined' || !cameraInfo) {
            return;
        }
        if (cameraInfo.constructor === String) {
            cameraInfo = cameraInfo.split(',');
            cameraInfo = cameraInfo.map(c => Number(c));
        }
        if (typeof duration === "undefined") {
            duration = 0;
        }
        let wcs = this.tool.tc(cameraInfo);
        let info = Object.assign({}, cameraInfo);
        info[0] = wcs['x'];
        info[1] = wcs['y'];
        info[2] = wcs['z'];
        this.engine.scene.setCameraInfo(info, duration);
    };

    /**
     * 获取拾取模式
     */
    getPickMode() {
        return this.param.pickMode;
    };

    /**
     * 设置拾取模式
     * @param mode {number} 拾取模式
     * @example
     *     0: 关闭
     *     1: 单选
     *     2: 多选
     */
    setPickMode(mode) {
        this.param.pickMode = mode;
        switch (mode) {
            case 0 :
                this.engine.scene.setPickEnable(false);
                break;
            case 1 :
                this.engine.scene.setPickEnable(true);
                this.engine.scene.isOnlyCurrent = true;
                break;
            case 2 :
                this.engine.scene.setPickEnable(true);
                this.engine.scene.isOnlyCurrent = false;
                break;
            default:
                break;
        }
    };

    /**
     *
     * @param mode {number} 激活模式
     * @example
     *     1: 左键单击
     *     2: 左键双击
     */
    setClickMode(mode) {
        switch (mode) {
            case 1:
                this.param.clickMode = BcEngineX.ScreenSpaceEventType.LEFT_CLICK;
                break;
            case 2:
                this.param.clickMode = BcEngineX.ScreenSpaceEventType.LEFT_DOUBLE_CLICK;
                break;
            default:
                break;
        }
    };

    /**
     * 高亮部件
     * @param {string|string[]} componentID 部件的id
     * @param {string=} pmtsID pmts的id
     * @param {{}=} tileSet 模型
     * @param {number=} r 颜色R分量，范围0~255
     * @param {number=} g 颜色G分量，范围0~255
     * @param {number=} b 颜色B分量，范围0~255
     * @param {number=} a 透明度，范围0~1
     */
    highlightComponent(componentID, pmtsID, tileSet, r, g, b, a) {
        if (!componentID) {
            return;
        }
        if (componentID.constructor === String) {
            componentID = [componentID];
        }
        this.getPmts(pmtsID).setNodesHighColor(componentID, r, g, b, true);
    };

    /**
     * 恢复所有高亮部件
     */
    unhighlightAllComponents() {
        this.engine.scene.clearPick();
        this.param.modelLayers.forEach(modelLayer => modelLayer.removeAllNodeHightColor());
    };

    /**
     * 开始第一人称
     */
    startFirstPerson() {
        this.engine.scene.startFirstPerson();
    };

    /**
     * 结束第一人称
     */
    stopFirstPerson() {
        this.engine.scene.stopFirstPerson();
    };

    /**
     * 模型编辑
     * @type {{}}
     */
    matrixTransform = (() => {
        let _this = this;
        let modelIds = [];
        let sourceMatrixMap = {};
        let executing = false;
        let _helper;
        let rmel;
        return {
            /**
             * 开始编辑
             * @param {string|string[]} ids
             */
            start(ids) {
                if (executing) {
                    return false;
                }
                executing = true;
                modelIds = [].concat(ids);
                modelIds.forEach(id => {
                    sourceMatrixMap[id] = _this.getPmts(id).modelMatrix;
                });
                if (!_helper) {
                    _helper = _this.engine.scene.geometryDrawHelper.matrixTransformHelper;
                }
                _helper.matrix = sourceMatrixMap[modelIds[0]];
                _helper.show = true;
                rmel = _helper.onTransform.addEventListener(matrix => {
                    modelIds.forEach(id => {
                        _this.getPmts(id).modelMatrix = matrix;
                    });
                });
                return true;
            },
            /**
             * 重置
             */
            reset() {
                modelIds.forEach(id => {
                    _this.getPmts(id).modelMatrix = sourceMatrixMap[id];
                });
                _helper.matrix = sourceMatrixMap[modelIds[0]];
            },
            /**
             * 取消编辑
             */
            cancel() {
                this.reset();
                this.end();
            },
            /**
             * 结束编辑
             */
            end() {
                if (!executing) {
                    return;
                }
                _helper.show = false;
                rmel();
                modelIds = [];
                sourceMatrixMap = {};
                executing = false;
            },
        }
    })();

    /**
     * 工具
     * @type {{}}
     */
    tool = {
        /**
         * 地理坐标转换为世界坐标
         * @param {number[]} position
         * @returns {{x,y,z}}
         */
        tc(position) {
            return BcEngineX.BcTool.gcs2wcs(position);
        },
        /**
         * 世界坐标转换为地理坐标
         * @param {{x,y,z}} position
         * @returns {number[]}
         */
        tg(position) {
            return BcEngineX.BcTool.wcs2gcs(position);
        },

        /**
         * 唯一ID
         * @returns {string}
         */
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        /**
         * 获取一组点的中心点
         * @param {Cartesian3[]} pts 世界坐标集合
         * @returns {Cartesian3}
         */
        getCenterOfPts(pts) {
            let cartesian3 = new BcEngineX.Cartesian3;
            let length = pts.length;
            for (let i = 0; i < length; ++i) {
                BcEngineX.Cartesian3.add(pts[i], cartesian3, cartesian3)
            }
            BcEngineX.Cartesian3.multiplyByScalar(cartesian3, 1 / length, cartesian3);
            return cartesian3;
        },
        /**
         * rgba色 转 16进制颜色转
         * @param rgbaArray
         * @param alphaMaxVal 一般这里就是1或者255 默认以1为基准 如果最大值是255 就写255
         * @returns {*[]}
         */
        rgbaToHexColor(rgbaArray, alphaMaxVal = 1) {
            //补位警号
            return "#" + rgbaArray.map((chanel, index) => {
                let hexNum = "";
                if (index === 3) {
                    //这是alpha通道
                    hexNum = Number(Math.round(chanel * 255 / alphaMaxVal)).toString(16);
                } else {
                    //普通通道直接转换
                    hexNum = Number(chanel).toString(16)
                }
                return hexNum.length === 1 ? '0' + hexNum : hexNum;//这里解决了部分通道数字小于10的情况进行补位
            }).join("");
        },
        /**
         * 16进制颜色转 rgba色
         * @param hexColor
         * @param alphaMaxVal 一般这里就是1或者255 默认以1为基准 如果最大值是255 就写255
         * @returns {*[]}
         */
        hexColorToRgba(hexColor, alphaMaxVal = 1) {
            hexColor = hexColor.replace("#", "");

            //用于分割16进制色彩通道
            let reg = new RegExp("\\w{1,2}", "g");
            //分割颜色通道
            let rgbaArray255 = hexColor.match(reg);
            rgbaArray255 = rgbaArray255.map((channel, index) => {
                //计算每个通道的10进制值
                let colorVal = parseInt(channel, 16);
                if (index === 3) {
                    //这是alpha通道
                    return Math.round(colorVal / (255 / alphaMaxVal) * 100) / 100
                }
                return colorVal;
            });
            return rgbaArray255;
        }
    };

    /**
     * 世界坐标转换为屏幕坐标
     * @param {{x,y,z}} position
     * @returns {{x,y}}
     */
    wcs2scc(position) {
        return this.engine.scene.wcs2scc(position);
    };

    /**
     * 获取两点直线距离
     * @param positions
     * @returns {number}
     */
    getSpaceDistance(positions) {
        let distance = 0;
        for (var i = 0; i < positions.length - 1; i++) {
            let point1 = positions[i];
            if (Array.isArray(positions[i])) {
                point1 = this.tool.tc(positions[i]);
            }
            let point2 = positions[i + 1];
            if (Array.isArray(positions[i + 1])) {
                point2 = this.tool.tc(positions[i + 1]);
            }
            /**根据世界坐标计算出距离**/
            let s = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) + Math.pow(point1.z - point2.z, 2));
            distance = distance + s;
        }
        return distance;
    }
}
