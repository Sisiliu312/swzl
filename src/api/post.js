import request from "@/request"


export function getPosts(page) {
	return request({
		  method: 'get',
		  url: '/posts',
		  data: page
		})
}

export function getPostDetail(id){
	return request({
		method: 'get',
		url: `/posts/detail/${id}`
	})
}

export function getPostByCampus(id){
	return request({
		method: 'get',
		url: `/posts/campus/${id}`
	})
}

export function getPostByCategory(id){
	return request({
		method: 'get',
		url: `/posts/category/${id}`
	})
}

export function getPostByDate(date){
	return request({
		method: 'get',
		url: `/posts/date/${date}`
	})
}

export function getPostByUser(id){
	return request({
		method: 'get',
		url: `/posts/user/${id}`
	})
}

export function publish(data){
	return request({
		method: 'post',
		url: '/posts',
		data
	})
}

export function deletePost(id){
	return request({
		method: 'delete',
		url:`/posts/${id}`
	})
}