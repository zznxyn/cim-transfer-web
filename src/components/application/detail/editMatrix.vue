<template>
    <el-dialog title="编辑模型矩阵" :visible.sync="showEditMatrixDialog" width="27%">
        <el-form :model="matrixForm" @submit.native.prevent class="matrixForm">
            <el-row style="margin-bottom: 20px">
                <el-col>
                    <el-form-item label="模型矩阵" label-width="70px" prop="name">
                        <el-input type="textarea" v-model="matrixForm.modelMatrix" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <FormButton type="primary" @click="editMatrixFile">确 定</FormButton>
            <FormButton @click="showEditMatrixDialog=false;matrixForm.modelMatrix='';">取消</FormButton>
        </div>
    </el-dialog>
</template>
<script>
    import {Message} from "element-ui";

    export default {
        data() {
            return {
                showEditMatrixDialog: false,
                matrixForm: {
                    fileId: '',
                    modelMatrix: '',
                },
            }
        },
        methods: {
            editMatrixFile() {
                let modelMatrix;
                try {
                    modelMatrix = JSON.parse(this.matrixForm.modelMatrix);
                } catch (e) {
                    Message.error('矩阵格式有误！');
                    return;
                }
                if (!Array.isArray(modelMatrix) || modelMatrix.length !== 16){
                    Message.error('矩阵格式有误！');
                    return;
                }
                let param = {
                    projectId: this.$store.state.application.projectId,
                    matrices: JSON.stringify({
                        [this.matrixForm.fileId]: modelMatrix
                    })
                }
                this.$http.post('/model/updateGraph', param, '保存成功').then(() => {
                    this.$emit('matrixEdit', this.matrixForm);
                    this.showEditMatrixDialog = false;
                });
            }
        }
    }

</script>
<style lang="less" scoped>
    .el-form-item {
        margin-bottom: 0;
    }
    /deep/ .matrixForm .el-textarea__inner {
        height: 120px;
    }
</style>
