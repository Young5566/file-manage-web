<template>
    <d2-container>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="文件名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="文件类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="group_name"
                    label="文件组名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="remote_file_id"
                    label="remoteId">
            </el-table-column>
            <el-table-column
                    prop="storage_ip"
                    label="storageIp"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="size"
                    label="大小"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="file_url"
                    label="文件地址">
            </el-table-column>
            <el-table-column
                    prop="create_time"
                    label="创建时间"
                    width="150">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="210">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleView(scope.$index, scope.row)">查看
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
    export default {
        data() {
            return {
                name:'',
                dialogValue:false,
                imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548072151&di=e3c88095ad548f75d82728ce3761345a&imgtype=jpg&er=1&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201804%2F14%2F115226t84zqpp8gsg9q9bs.jpg',
                tableData: [{
                    name: 'haha.jpg',
                    type: 'image',
                    group_name: 'group1',
                    remote_file_id: 'group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg',
                    storage_ip: '192.168.0.129',
                    size: 49260,
                    file_url: 'http://192.168.0.126/group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg',
                    create_time: '2018-11-21 02:21:26'
                }, {
                    name: 'haha.jpg',
                    type: 'image',
                    group_name: 'group1',
                    remote_file_id: 'group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg',
                    storage_ip: '192.168.0.129',
                    size: 49260,
                    file_url: 'http://192.168.0.126/group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg',
                    create_time: '2018-11-21 02:21:26'
                }, {
                    name: 'haha.jpg',
                    type: 'image',
                    group_name: 'group1',
                    remote_file_id: 'group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg',
                    storage_ip: '192.168.0.129',
                    size: 49260,
                    file_url: 'http://192.168.0.126/group1/M00/00/00/wKgAgVvs2CGAMtHrAADAbPBzjhw358.jpg',
                    create_time: '2018-11-21 02:21:26'
                }]
            }
        },
        methods:{
            handleView(index, fileInfo){
                this.dialogValue = true;
                this.name = fileInfo.name
            },
            handleDownload(index, fileInfo){

            },
            handleDelete(index,fileInfo){

            }
        }
    }
</script>
<style scoped>
    .el-dialog__wrapper{
        overflow-y: hidden;
    }
</style>