<template>
    <el-row v-if="formParams.length > 0">
        <el-col :span="24">
            <el-form label-width="100px" size="medium" class="form" ref="ruleForm" :model="formData">
                <!--                <el-row>-->
                <!--                    <el-col :span="24">-->
                <el-row>
                    <el-col v-for="(formParam,index) in formParams" :span="8" :key="index">
                        <el-form-item v-if="formParam.type === 'date'" :label="formParam.label">
                            <el-date-picker v-model="formData[formParam.prop]" type="date" :editable="false"
                                            :placeholder="formParam.placeholder" value-format="yyyy/MM/dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item v-else :label="formParam.label" :prop="formParam.prop">
                            <el-input v-model="formData[formParam.prop]" :placeholder="formParam.placeholder"
                                      @change="$emit('formChange')" @input="changeSequence">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
<!--                        <el-form-item>-->
                            <FormButton v-if="searchAvailable" type="primary" icon="el-icon-search" @click="search">查询
                            </FormButton>
                            <FormButton v-if="resetAvailable" @click="reset">重置</FormButton>
<!--                        </el-form-item>-->
                    </el-col>
                </el-row>
                <!--                    </el-col>-->
                <!--                </el-row>-->
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        props: {
            formData: {
                type: Object,
                default: () => {
                }
            },
            formParams: {
                type: Array,
                default: () => []
            },
            formChange: {
                type: Function,
                default: () => () => {
                }
            },
            searchAvailable: {
                type: Boolean,
                default: false
            },
            search: {
                type: Function,
                default: () => () => {
                }
            },
            resetAvailable: {
                type: Boolean,
                default: false
            },
            reset: {
                type: Function,
                default: () => () => {
                }
            },
        },
        methods: {
            changeSequence() {
                this.$forceUpdate();
            }
        }
    }

</script>
