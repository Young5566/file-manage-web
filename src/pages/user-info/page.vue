<template>
    <d2-container>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="uuid"
                    label="用户ID">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名称">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleView(scope.$index, scope.row)">详情
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </d2-container>
</template>

<script>
    import {getAllUser, deleteUser} from "../../api/user";

    export default {
        data() {
            return {
                tableData: []
            }
        },
        mounted(){
            this.getAllUser()
        },
        methods:{
            handleView(index, userInfo){
                this.$router.replace({
                    name: "user-user-detail",
                    query:{name: userInfo.username}
                })
            },
            handleDelete(index, userInfo){
                this.$confirm('此操作将永久删除  ' + userInfo.username +', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteUser(index, userInfo)
                }).catch(() => {
                    this.messagePoint('已取消删除', 'info')
                });
            },
            deleteUser(index,userInfo){
                deleteUser(userInfo.username).then(
                    res => {
                        if(res.code === 200 ){
                            this.messagePoint("删除成功", "success");
                            this.tableData.splice(index, 1)
                        } else {
                            this.messagePoint("删除失败", "error")
                        }
                    }
                )
            },
            getAllUser(){
                getAllUser().then(
                    res => {
                        this.tableData = res.data;
                    }
                )
            }
        }
    }
</script>
<style scoped>
    .el-dialog__wrapper{
        /*overflow-y: hidden;*/
    }
</style>