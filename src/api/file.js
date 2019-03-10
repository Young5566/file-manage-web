import IP from "./ip";
import request from '@/plugin/axios';

const fileUrl = IP.IP + "/file";

export function updateFile (data) {
    return request({
        url: fileUrl + "/update",
        method: "post",
        data
    })
}

export function deleteFile(data) {
    return request({
        url: fileUrl + "/" + data.name + "/delete/" +   data.uuid,
        method: 'delete'
    })
}

export function getFileInfo(data) {
    return request({
        url: fileUrl + "/" + data,
        method: 'get'
    })
}

export function getAllFile(page) {
    return request({
        url: fileUrl + "/getAll?page=" + page,
        method: 'get'
    })
}

export function downloadFile(data) {
    return request({
        url: fileUrl + "/download/"+ data,
        method: 'get'
    })
}