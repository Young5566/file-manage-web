<template>
    <d2-container>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="文件名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="文件类型"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="storageIp"
                    label="storageIp"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="uploader"
                    label="上传者"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="fileUrl"
                    label="文件地址">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="280">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.type.split('/')[0] === 'image'"
                               size="mini"
                               @click="handleViewPicture(scope.$index, scope.row)">查看
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleView(scope.$index, scope.row)">详情
                    </el-button>
                    <el-button
                            size="mini"
                            @click="handleDownload(scope.$index, scope.row)">下载
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                :title="name"
                :visible.sync="dialogValue"
                center
                width="70vw"
                :lock-scroll="false"
                top="2vw">
            <img style="width: 100%" :src="imgUrl"/>
        </el-dialog>
    </d2-container>
</template>

<script>
    import {getAllFile, downloadFile, deleteFile} from "../../api/file";
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                name:'',
                dialogValue:false,
                imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548072151&di=e3c88095ad548f75d82728ce3761345a&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201804%2F14%2F115226t84zqpp8gsg9q9bs.jpg',
                tableData: []
            }
        },
        mounted(){
          this.getAllFiles(1)
        },
        computed: {
            ...mapState('d2admin/user', [
                'info'
            ])
        },
        methods:{
            handleViewPicture(index, fileInfo){
              this.dialogValue = true;
              this.imgUrl = fileInfo.fileUrl;
              this.name = fileInfo.name;
            },
            handleView(index, fileInfo){
                this.$router.replace({
                    name: "file-file-detail",
                    query:{id: fileInfo.uuid}
                })
            },
            handleDownload(index, fileInfo){
                downloadFile(fileInfo.uuid).then(
                    res => {
                        if(res.code === 200 ){
                            this.messagePoint("已下载到桌面", "success")
                        } else {
                            this.messagePoint("下载失败", "error")
                        }
                    }
                )
            },
            handleDelete(index, fileInfo){
                this.$confirm('此操作将永久删除  ' + fileInfo.name +', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteFile(index, fileInfo)
                }).catch((error) => {
                    console.log(error)
                    this.messagePoint('已取消删除', 'info')
                });
            },
            deleteFile(index,fileInfo){
                deleteFile({name:this.info.name, uuid:fileInfo.uuid}).then(
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
            getAllFiles(page){
                getAllFile(page).then(
                    res => {
                        this.tableData = res.data.files;
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