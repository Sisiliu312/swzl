import request from "@/request"


export function upload(data) {
	return request({
		  method: 'post',
		  url: '/upload',
		  data
		})
}