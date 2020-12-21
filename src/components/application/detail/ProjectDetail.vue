<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-row type="flex" align="middle">
                    <el-col :span="1">
                        <img class="lt_img_main_area" src="@/assets/images/jx.png" alt="">
                    </el-col>
                    <el-col :span="6">
                        <span class="title_main_area">工程基本信息</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

        <el-row style="margin-top: 10px">
            <!-- <CimForm :formData="application" :formParams="formParams" @formChange="handlerChange"></CimForm> -->
            <!-- <ProjectInfoForm :formData="application" @formChange="handlerChange"></ProjectInfoForm> -->
            <el-row>
                <el-col :span="24">
                    <el-form label-width="100px" size="medium" class="form" ref="formRe0f" :rules="rules"
                        :model="application">
                        <el-row>
                            <el-col :span=23>
                                <el-row>
                                    <el-col :span="7">
                                        <el-form-item label="工程名称" prop="projectName">
                                            <el-input v-model="application.projectName" @change="handlerChange"
                                                placeholder="请输入工程名称"></el-input>
                                        </el-form-item>
                                        <el-form-item label="设计单位" prop="designUnit">
                                            <el-input v-model="application.designUnit" @change="handlerChange"
                                                placeholder="请输入设计单位"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="7">
                                        <el-form-item label="监理单位" prop="supervisionUnit">
                                            <el-input v-model="application.supervisionUnit" @change="handlerChange">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="建设单位" prop="constructionUnit">
                                            <el-input v-model="application.constructionUnit" @change="handlerChange"
                                                placeholder="请输入建设单位">
                                            </el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="工程类型" prop="projectType">
                                            <treeselect v-model="application.projectType" placeholder="请选择"
                                                :searchable="false" :multiple="false" :disable-branch-nodes="true"
                                                :clearable="false" :options="options" @select="treeSelect"
                                                :normalizer="normalizer" :alwaysOpen="false"
                                                :defaultExpandLevel="Infinity" />
                                        </el-form-item>
                                        <el-form-item label="工程地址">
                                            <el-row>
                                                <el-col :span="16">
                                                    <el-row :gutter="5">
                                                        <el-col :span="8">
                                                            <el-select v-model="application.provinceCode"
                                                                placeholder="请选择" @change="setProvinceCode">
                                                                <el-option v-for="item in provinceNameList"
                                                                    :key="item.value" :label="item.oname"
                                                                    :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-select v-model="application.cityCode" placeholder="请选择"
                                                                @change="setCityCode">
                                                                <el-option v-for="item in cityNameList"
                                                                    :key="item.value" :label="item.oname"
                                                                    :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                        </el-col>
                                                        <el-col :span="8">
                                                            <el-select v-model="application.areaCode" placeholder="请选择"
                                                                @change="selectArea">
                                                                <el-option v-for="item in areaNameList"
                                                                    :key="item.value" :label="item.oname"
                                                                    :value="item.code">
                                                                </el-option>
                                                            </el-select>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-input v-model="application.detail" @change="handlerChange"
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
        </el-row>
    </div>
</template>
<script>
    // import CimForm from '@/components/common/form'
    // import ProjectInfoForm from './ProjectInfoForm.vue'

    // 导入vue-treeselect
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        props: {
            isCreate: {
                type: Boolean,
                default: false
            }
        },
        components: {
            Treeselect
            // CimForm
            // ProjectInfoForm
        },
        data() {
            return {
                // 工程基本信息绑定表单数据
                application: {
                    id: '',
                    projectId: '',
                    projectName: '',
                    constructionUnit: '',
                    designUnit: '',
                    supervisionUnit: '',
                    provinceCode: '',
                    provinceName: '',
                    cityCode: '',
                    cityName: '',
                    areaCode: '',
                    areaName: '',
                    detail: '',
                    projectType: null,
                },
                options: [],
                // 处理返回的数据，没有children就删掉
                normalizer(node) {
                    // console.log(node);
                    if (!node.children || !node.children.length) {
                        delete node.children
                    }
                    return {
                        id: node.oname,
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
                        trigger: 'change'
                    }]
                }
            }
        },
        created() {
            this.getApplication();
            this.getProjectType();
            this.getProvince();
        },
        methods: {
            // 获取工程基本信息
            getApplication() {
                if (this.isCreate) {
                    this.$http.post('transfer/applications').then(data => {
                        this.initApplication(data)
                    })
                } else {
                    this.$http.get('transfer/applications/' + this.$route.params.id).then(data => {
                        this.initApplication(data)
                    })
                }
            },
            // 根据查询结果，初始化表单数据
            initApplication(result) {
                this.application = this.BeanUtils.copyProp(this.application, result)
                if (!this.application.provinceCode) {
                    this.application.provinceCode = '50'
                }
                if (!this.application.projectType) {
                    this.application.projectType = null
                }
                setTimeout(() => {
                    this.$store.commit('application/init', this.application)
                    this.$emit('projectInited')
                }, 0)
            },
            // 更新基本信息
            handlerChange() {
                this.$http.post(`/transfer/updateProjects/${this.application.projectId}`, {
                    projectName: this.application.projectName,
                    designUnit: this.application.designUnit,
                    supervisionUnit: this.application.supervisionUnit,
                    constructionUnit: this.application.constructionUnit,
                    detail: this.application.detail
                })
            },

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
                }).then(data => {})
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
                    if (!this.application.cityCode) {
                        this.application.cityCode = this.cityNameList[0].code
                        this.application.cityName = this.cityNameList[0].oname
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
                this.application.areaName = this.areaNameList.find(item => {
                    return item.code === code
                }).oname
                this.$http.post(`/transfer/updateProjects/${this.$store.state.application.projectId}`, {
                    provinceName: this.application.provinceName,
                    provinceCode: this.application.provinceCode,
                    cityName: this.application.cityName,
                    cityCode: this.application.cityCode,
                    areaName: this.application.areaName,
                    areaCode: this.application.areaCode,
                    projectName: this.application.projectName,
                })
            },
            setProvinceCode(code) {
                // 给provinceName赋值
                this.application.provinceName = this.provinceNameList.find(item => {
                    return item.code === code
                }).oname
                this.application.provinceCode = code
                this.application.cityCode = undefined
                this.application.areaCode = undefined
                this.application.cityNameList = []
                this.application.areaNameList = []
            },
            setCityCode(code) {
                this.application.cityName = this.cityNameList.find(item => {
                    return item.code === code
                }).oname
                this.application.cityCode = code
                this.application.areaCode = undefined
                this.application.areaNameList = []
            },
        },
        watch: {
            'application.provinceCode': function (val, old) { //特别注意，不能用箭头函数，箭头函数，this指向全局
                this.selectProvince(val)
            },
            'application.cityCode': function (val, old) {
                if (val) {
                    this.selectCity(val)
                }
            },

        }
    }

</script>
