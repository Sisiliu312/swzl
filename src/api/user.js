import request from "@/request"

export function getUserById(id){
	return request({
		method: 'get',
		url: `/info/${id}`
	})
}

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

// 更改用户头像
export function updateUserInfo(data){
	return request({
		method: 'put',
		url: '/user/update',
		data
	})
}