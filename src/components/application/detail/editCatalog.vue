<template>
    <el-dialog title="编辑" :visible.sync="showEditCatalogDialog" width="27%">
        <el-form :model="catalogForm">
            <el-row style="margin-bottom: 20px">
                <el-col>
                    <el-form-item label="名称" label-width="70px" prop="name">
                        <el-input v-model="catalogForm.name" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="10" type="flex" align="middle" style="margin-bottom: 20px" v-show="showEditModel">
                <el-col :span="10">
                    <el-form-item prop="longitude" label="模型位置" label-width="70px">
                        <el-input v-model="catalogForm.longitude" placeholder="经度" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item prop="latitude">
                        <el-input v-model="catalogForm.latitude" placeholder="纬度" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item prop="height">
                        <el-input v-model="catalogForm.height" placeholder="高度" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" align="middle" v-show="showModelDate">
                <el-col :span="24">
                    <el-form-item prop="makeDate" label="制作日期" label-width="70px">
                        <el-date-picker
                            v-model="catalogForm.makeDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <FormButton type="primary" @click="editCatalogFile">确 定</FormButton>
            <FormButton @click="showEditCatalogDialog = false">取消</FormButton>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                showEditCatalogDialog: false,
                catalogForm: {
                    name: '',
                    id: '',
                    longitude: '',
                    latitude: '',
                    height: '',
                    makeDate: '',
                },
                showModelDate: false,
                showEditModel: false
            }
        },
        methods: {
            editCatalogFile() {
                this.showEditCatalogDialog = false
                this.$http.post('/data/modifyName', this.catalogForm, '修改成功').then(data => {
                    this.$emit('catalogEdit')
                })
            }
        }
    }

</script>
<style lang="less" scoped>
    .el-form-item {
        margin-bottom: 0;
    }
</style>
