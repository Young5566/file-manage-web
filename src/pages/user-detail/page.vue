<template>
    <d2-container>
        <div style="display: flex;justify-content: center; align-items: center; padding: 10px 0">
            <el-form style="width: 50%" ref="file" :model="user" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateUser">立即修改</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>
<script>
    import {findByUsername, updateUser} from "../../api/user";

    export default {
        data() {
            return {
                user: {
                    username:"",
                    password:""
                }
            }
        },
        mounted(){
            this.findByUsername(this.$route.query.name)
        },
        methods: {
            update() {
                console.log('submit!');
            },
            findByUsername(username){
                findByUsername(username).then(
                    res => {
                        if(res.code === 200) {
                            this.user = res.data;
                        } else {
                            this.messagePoint("获取失败","error")
                        }
                    }
                )
            },
            updateUser(){
                updateUser(this.user).then(
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