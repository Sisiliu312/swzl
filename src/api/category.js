import request from "@/request"


export function listCategories(categoryId) {
	return request({
		  method: 'get',
		  url: `/categories/${categoryId}`
		})
}