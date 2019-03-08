<template>
    <d2-container>
        <div style="display: flex;justify-content: center; align-items: center; padding: 10px 0">
            <el-form style="width: 50%" ref="user" :model="user" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="user.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="user.confirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('user')">立即添加</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>
<script>
    import {addUser} from "../../api/user";

    export default {
        data() {
            return {
                user: {
                    username:"",
                    password:"",
                    confirmPassword:"",
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change' }
                    ],
                    confirmPassword: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            addUser(userInfo){
                addUser(userInfo).then(
                    res => {
                        if(res.code === 200) {
                            this.file = res.data;
                            this.messagePoint("添加用户成功","success");
                            this.$router.push({
                                name: "user-user-info"
                            })
                        } else {
                            this.messagePoint("获取失败","error")
                        }
                    }
                )
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid ) {
                        if(this.user.confirmPassword !== this.user.password){
                            this.messagePoint("两次输入密码不一致，请重新输入","warning");
                            this.user.password = '';
                            this.user.confirmPassword = '';
                            return false;
                        }
                        this.addUser(this.user);
                    } else {
                        this.messagePoint("请合法输入","warning")
                        return false;
                    }
                });
            }
        }
    }
</script>