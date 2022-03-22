import request from "@/request"


export function getUserPost(id){
	return request({
		method: 'get',
		url: `/user/${id}`
	})
}

export function deleteUserPost(id){
	return request({
		method: 'delete',
		url: `/user/${id}`
	})
}

export function getUserInfo(data){
	return request({
		method: 'post',
		url: '/account',
		data
	})
}