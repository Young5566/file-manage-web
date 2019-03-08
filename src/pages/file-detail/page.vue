<template>
    <d2-container>
        <div style="display: flex;justify-content: center; align-items: center; padding: 10px 0">
            <el-form style="width: 50%" ref="file" :model="file" label-width="80px">
                <el-form-item label="文件名">
                    <el-input v-model="file.name"></el-input>
                </el-form-item>
                <el-form-item label="groupName">
                    <el-input :readonly="true" v-model="file.groupName"></el-input>
                </el-form-item>
                <el-form-item label="remoteFileId">
                    <el-input :readonly="true" v-model="file.remoteFileId"></el-input>
                </el-form-item>
                <el-form-item label="storageIp">
                    <el-input v-model="file.storageIp"></el-input>
                </el-form-item>
                <el-form-item label="大小">
                    <el-input v-model="file.size"></el-input>
                </el-form-item>
                <el-form-item label="文件地址">
                    <el-input :readonly="true" v-model="file.fileUrl"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="file.type"></el-input>
                </el-form-item>
                <el-form-item label="创建者">
                    <el-input v-model="file.uploader"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-input v-model="file.createTime"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleUpdate">立即修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>
<script>
    import {getFileInfo, updateFile} from "../../api/file";
    export default {
        data() {
            return {
                file: {
                    name:"",
                    groupName:"",
                    remoteFileId:"",
                    storageIp:"",
                    size:"",
                    fileUrl:"",
                    type:"",
                    uploader:"",
                    createTime:"",
                }
            }
        },
        mounted(){
          this.getFileDetail(this.$route.query.id)
        },
        methods: {
            update() {
                console.log('submit!');
            },
            getFileDetail(uuid){
                getFileInfo(uuid).then(
                    res => {
                        if(res.code === 200) {
                            this.file = res.data;
                        } else {
                            this.messagePoint("获取失败","error")
                        }
                    }
                )
            },
            handleUpdate(){
                updateFile(this.file).then(
                    res => {
                        console.log(res);
                        if(res.code === 200){
                            this.messagePoint('修改成功！', 'success')
                        } else {
                            this.messagePoint("修改失败", "error")
                        }
                    }
                )
            }
        }
    }
</script>