<template>
    <el-row>
        <el-col :span="24">
            <el-form label-width="100px" size="medium" class="form" ref="formRe0f" :rules="rules" :model="formData">
                <el-row>
                    <el-col :span=23>
                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="工程名称" prop="projectName">
                                    <el-input v-model="formData.projectName" @change="$emit('formChange')"
                                        placeholder="请输入工程名称"></el-input>
                                </el-form-item>
                                <el-form-item label="设计单位" prop="designUnit">
                                    <el-input v-model="formData.designUnit" @change="$emit('formChange')"
                                        placeholder="请输入设计单位"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="监理单位" prop="supervisionUnit">
                                    <el-input v-model="formData.supervisionUnit" @change="$emit('formChange')">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="建设单位" prop="constructionUnit">
                                    <el-input v-model="formData.constructionUnit" @change="$emit('formChange')"
                                        placeholder="请输入建设单位">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="工程类型" prop="projectType">
                                    <treeselect v-model="formData.projectType" placeholder="请选择" :multiple="false"
                                        :disable-branch-nodes="true" :clearable="false" :options="options"
                                        @select="treeSelect" :normalizer="normalizer" :alwaysOpen="false"
                                        :defaultExpandLevel="Infinity" />
                                </el-form-item>
                                <el-form-item label="工程地址">
                                    <el-row>
                                        <el-col :span="16">
                                            <el-row :gutter="5">
                                                <el-col :span="8">
                                                    <el-select v-model="formData.provinceCode" placeholder="请选择"
                                                        @change="setProvinceCode">
                                                        <el-option v-for="item in provinceNameList" :key="item.value"
                                                            :label="item.oname" :value="item.code">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-select v-model="formData.cityCode" placeholder="请选择"
                                                        @change="setCityCode">
                                                        <el-option v-for="item in cityNameList" :key="item.value"
                                                            :label="item.oname" :value="item.code">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-select v-model="formData.areaCode" placeholder="请选择"
                                                        @change="selectArea">
                                                        <el-option v-for="item in areaNameList" :key="item.value"
                                                            :label="item.oname" :value="item.code">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-input v-model="formData.detail" @change="$emit('formChange')"
                                                placeholder="请输入">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
    // 导入vue-treeselect
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        components: {
            Treeselect
        },
        props: {
            formData: {
                type: Object,
                default: () => {}
            },
        },
        data() {
            return {
                options: [],
                // 处理返回的数据，没有children就删掉
                normalizer(node) {
                    // console.log(node);
                    if (!node.children || !node.children.length) {
                        delete node.children
                    }
                    return {
                        id: node.code,
                        label: node.oname,
                        children: node.children
                    }
                },
                provinceNameList: [],
                cityNameList: [],
                areaNameList: [],
                rules: {
                    projectName: [{
                        required: true,
                        message: '请输入工程名称',
                        trigger: 'blur'
                    }, ],
                    designUnit: [{
                        required: true,
                        message: '请输入设计单位',
                        trigger: 'blur'
                    }],
                    supervisionUnit: [{
                        required: true,
                        message: '请输入监理单位',
                        trigger: 'blur'
                    }],
                    constructionUnit: [{
                        required: true,
                        message: '请输入建设单位',
                        trigger: 'blur'
                    }],
                    projectType: [{
                        required: true,
                        message: '请选择工程类型',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            // 请求工程类型数据
            getProjectType() {
                this.$http.get('/base/system/structDic/selectTreeByType', {
                    type: 'GCLX'
                }).then(data => {
                    this.options = data
                })
            },
            // 选择触发
            treeSelect(node) {
                this.$http.post(`/transfer/updateProjects/${this.$store.state.application.projectId}`, {
                    projectType: node.code
                }).then(data => {
                    console.log(data);
                })
            },
            // 请求省市数据
            getProvince() {
                this.$http.get('/base/system/structDic/selectListByType', {
                    type: 'AREA',
                    pcode: 10
                }).then(data => {
                    this.provinceNameList = data
                })
            },
            // 选择省
            selectProvince(provinceId) {
                return this.$http.get('/base/system/structDic/selectListByType', {
                    type: 'AREA',
                    pcode: provinceId
                }).then(data => {
                    this.cityNameList = data
                    if (!this.formData.cityCode) {
                        this.formData.cityCode = this.cityNameList[0].code
                        this.formData.cityName = this.cityNameList[0].oname
                    }
                })
            },
            // 选择市
            selectCity(cityId) {
                return this.$http.get('/base/system/structDic/selectListByType', {
                    type: 'AREA',
                    pcode: cityId
                }).then(data => {
                    this.areaNameList = data
                })
            },
            selectArea(code) {
                this.formData.areaName = this.areaNameList.find(item => {
                    return item.code === code
                }).oname
                this.$http.post(`/transfer/updateProjects/${this.$store.state.application.projectId}`, this.formData)
            },
            setProvinceCode(code) {
                // 给provinceName赋值
                this.formData.provinceName = this.provinceNameList.find(item => {
                    return item.code === code
                }).oname
                this.formData.provinceCode = code
                this.formData.cityCode = undefined
                this.formData.areaCode = undefined
                this.formData.cityNameList = []
                this.formData.areaNameList = []
            },
            setCityCode(code) {
                this.formData.cityName = this.cityNameList.find(item => {
                    return item.code === code
                }).oname
                this.formData.cityCode = code
                this.formData.areaCode = undefined
                this.formData.areaNameList = []
            },
        },
        created() {
            this.getProjectType()
            this.getProvince()
        },
        mounted() {
            // this.getProvince()
        },
        watch: {
            'formData.provinceCode': function (val, old) { //特别注意，不能用箭头函数，箭头函数，this指向全局
                this.selectProvince(val)
            },
            'formData.cityCode': function (val, old) {
                if (val) {
                    this.selectCity(val)
                }
            },

        }
    }

</script>
