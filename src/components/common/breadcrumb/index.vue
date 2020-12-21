<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(data,i) in breadcrumbDatas" :key="i">
            <span v-if="data" class="font_sm cursor_pointer breadcrumb_item_span"
                  @click="clicked(data)">{{data.name}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
    export default {
        props: {
            /**
             * data: BreadcrumbData
             */
            datas: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                breadcrumbDatas: []
            }
        },
        methods: {
            // 获取页面需要展示的面包屑
            getBreadcrumb() {
                return this.datas.filter(data => data !== undefined).map(data => {
                    data = this.nameStrip(data, 4)
                    return data
                })
            },
            // 数据中名称按指定长度截取，后面加省略号
            nameStrip(data, length) {
                if (!data || !data.name) {
                    return
                }
                if (data.name.length > length + 2) {
                    data.name = data.name.substr(0, length) + '...'
                }
                return data
            },
            // 重置面包屑数据
            resetData(currentData) {
                this.breadcrumbDatas = this.breadcrumbDatas.slice(0, this.breadcrumbDatas.indexOf(currentData) + 1)
                this.$emit('resetBreadcrumbData', this.breadcrumbDatas)
            },
            reload() {
                // 勿删setTimeout,这里是为了给要执行的任务排队
                setTimeout(() => {
                    this.breadcrumbDatas = this.getBreadcrumb()
                }, 0)
            },
            // 面包屑点击事件
            clicked(currentData) {
                if (currentData.clicked !== undefined) {
                    currentData.clicked(currentData);
                    this.resetData(currentData)
                } else if (currentData.name === '全部' || currentData.name === '已关联') {
                    this.resetData(currentData);
                    this.$emit('resetTableList');
                } else {
                    this.$emit('resetTableList');
                }
            }
        },
        created() {
            this.reload();
        }
    }

</script>
<style lang="less" scoped>
    .breadcrumb_item_span {
        line-height: 25px;
        font-size: 16px;
    }

</style>
