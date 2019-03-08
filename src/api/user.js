import IP from './ip';
import request from '@/plugin/axios';

const userUrl = IP.IP + "/user";

export function addUser(data) {
    return request({
        url: userUrl + "/add",
        method: 'post',
        data
    })
}

export function getAllUser() {
    return request({
        url: userUrl + "/getAll",
        method: 'get'
    })
}

export function findByUsername(data) {
    return request({
        url: userUrl + "/" + data,
        method: 'get'
    })
}

export function updateUser(data) {
    return request({
        url: userUrl + "/update",
        method: 'post',
        data
    })
}

export function deleteUser(data) {
    return request({
        url: userUrl + "/delete/" + data,
        method: 'delete'
    })
}