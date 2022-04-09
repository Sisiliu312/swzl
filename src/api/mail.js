import request from "@/request"

export function sendMail(data){
	return request({
		method: 'post',
		url: '/mail',
		params:{
            content:data
        }
	})
}