<template>
    <el-dialog title="创建目录" :visible.sync="showCreateCatalogDialog" width="25%" center>
        <el-form :model="catalogForm">
            <el-form-item label="目录名称" label-width="70px">
                <el-input v-model="catalogForm.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center">
            <FormButton type="primary" @click="createCatalog">确 定</FormButton>
            <FormButton @click="showCreateCatalogDialog = false">取消</FormButton>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                showCreateCatalogDialog: false,
                catalogForm: {
                    name: ''
                }
            }
        },
        methods: {
            createCatalog() {
                if(this.catalogForm.name == '') {
                    return this.$message.warning('请填写目录名称')
                }
                Object.assign(this.catalogForm, {
                    projectId: this.$store.state.application.projectId,
                    type: this.$store.state.application.catalogTreeCurrentCode,
                    catalogId: this.$store.state.application.currentCatalogId,
                    weight: 0,
                })
                this.showCreateCatalogDialog = false
                this.$http.post('/data/addProjectFile', this.catalogForm, '添加成功').then(data => {
                        this.catalogForm.name = ''
                        setTimeout(() => this.$emit('catalogAdded'), 0)
                    }
                )
            }
        }
    }

</script>
