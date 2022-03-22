import request from "@/request"


export function listTags(categoryId) {
	return request({
		  method: 'get',
		  url: `/tags/${categoryId}`
		})
}