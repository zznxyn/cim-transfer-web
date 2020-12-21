<template>
    <div>
        <el-tree ref="cimTree" :data="treeData" :props="defaultProps" node-key="id" icon-class="null"
                 :default-expand-all="true" :indent="indent" @node-click="nodeClick" :highlight-current="true"
                 :expand-on-click-node="expandOnClickNode" :check-on-click-node="true" :id="treeId">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>
                    <img class="el-tree-icon" :src="getIcon(data.icon)"/>
                    <span :class="data.class">{{ node.label }}</span>
                </span>
            </span>
        </el-tree>
    </div>

</template>
<script>
    import TreeDataParams from '@/components/common/tree/treeDataParams.js'

    export default {
        props: {
            url: {
                type: String,
                default: ''
            },
            params: {
                type: Object,
                default() {
                    return {}
                }
            },
            resParams: {
                type: Object,
                default() {
                    return new TreeDataParams()
                }
            },
            // 子节点是否缩进
            indent: {
                type: Number,
                default: 16
            },
            showIcon: {
                type: Boolean,
                default: true
            },
            expandOnClickNode: {
                type: Boolean,
                default: true
            },
            // 同一页面中存在多颗树时，请为每棵树指定唯一的树Id
            treeId: {
                type: String,
                default: ''
            },
            iconPath: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }
        },
        methods: {
            nodeClick(nodeData, node, self) {
                // console.log('nodeData',nodeData)
                // if(node.disabled) {
                //     return false;
                // }
                this.$emit('node-click', nodeData, node)
            },
            getIcon(icon) {
                if (icon === undefined || icon === null) {
                    icon = 'icon1.png'
                }
                return require('../../../assets/images/' + this.iconPath + icon)
            },
            // 获取数据
            getData() {
                this.$http.get(this.url, this.params).then(data => {
                    this.treeData = this.formatData(data)
                    this.treeData.map( item => {
                        if (item.children.length !== 0) {
                            item.disabled = true;
                            item.class = 'dis_mid'
                        }
                    })
                    this.$store.commit('tree/setTreeMenu', this.treeData)
                    // 勿删setTimeout,这里是为了给要执行的任务排队
                    /* setTimeout(() => {
                        // console.log('aaaa',this.treeId)
                        if (this.treeId != '') {
                            // console.log(document.querySelector('#' + this.treeId + ' .custom-tree-node'),'assaa')
                            document.querySelector('#' + this.treeId + ' .custom-tree-node').click()
                        } else {
                            document.querySelector('.custom-tree-node').click()
                        }
                    }, 0) */
                })
            },
            initTreeNode(data, style) {
                let treeNode = {}
                treeNode['id'] = data[this.resParams.id]
                treeNode['label'] = data[this.resParams.label]
                treeNode['icon'] = data[this.resParams.icon]
                treeNode['class'] = style
                treeNode['children'] = []
                treeNode['disabled'] = data[this.resParams.disabled] === 1 ? true : false
                treeNode['type'] = data[this.resParams.type]
                treeNode['accept'] = data[this.resParams.accept]
                return treeNode
            },
            // 格式化数据
            formatData(data) {
                let level1Nodes = data.filter(node => !(node[this.resParams.parentId])).map(node => {
                    return this.initTreeNode(node, 'font_mid blob')
                })
                level1Nodes = this.setChildren(level1Nodes, data)
                return level1Nodes
            },
            // 递归给节点添加子节点
            setChildren(parentNodes, originData) {
                parentNodes = parentNodes.map(
                    node => {
                        let sonNodes = originData.filter(data_node => data_node.pcode === node.id).map(
                            node => {
                                return this.initTreeNode(node, 'font_sm')
                            }
                        )
                        sonNodes = this.setChildren(sonNodes, originData)
                        node.children = node.children.concat(sonNodes)
                        return node
                    }
                )
                return parentNodes
            },
            // 返回树节点的父节点数组,顺序为自己、父节点、父节点的父节点...
            getParentNodesAsc(treeNode) {
                console.log(treeNode)
                let result = []
                if (treeNode.data) {
                    result.push(treeNode.data)
                    // 如果treeNode.data.parent类型为数组，代表treeNode是一级节点
                    if (!(treeNode.parent.data instanceof Array)) {
                        result = result.concat(this.getParentNodesAsc(treeNode.parent))
                    }
                }
                return result
            },
            // 返回树节点的父节点数组,顺序为...父节点的父节点, 父节点, 自己
            getParentNodes(treeNode) {
                return this.getParentNodesAsc(treeNode).reverse()
            },
        },
        created() {
            this.getData()
        },
    }

</script>
<style lang="less" scoped>
    .el-tree-icon {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        /* margin-left: -18px; */
        vertical-align: middle;
        margin-bottom: 4px;
    }

    /deep/ .el-tree-node {
        padding-top: 10px;
    }

    .el-tree {
        height: 100%;
    }
</style>
