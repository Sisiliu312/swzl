import request from "@/request"


export function publish(data){
	return request({
		method: 'post',
		url: '/asks',
		data
	})
}

export function getAskByUser(id){
	return request({
		method: 'get',
		url: `/asks/user/${id}`
	})
}

export function deleteAsk(id){
	return request({
		method: 'delete',
		url:`/asks/${id}`
	})
}