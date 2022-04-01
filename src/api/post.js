import request from "@/request"


export function getPosts(currentPage) {
	return request({
		  method: 'get',
		  url: '/posts',
		  params:{
			  currentPage: currentPage
		  }
		})
}

export function getPostDetail(id){
	return request({
		method: 'get',
		url: `/posts/detail/${id}`
	})
}

export function getPostByCampus(id,currentPage){
	return request({
		method: 'get',
		url: `/posts/campus/${id}`,
		params:{
			currentPage: currentPage
		}
	})
}

export function getPostByCategory(id,currentPage){
	return request({
		method: 'get',
		url: `/posts/category/${id}`,
		params:{
			currentPage: currentPage
		}
	})
}

export function getPostByDate(date,currentPage){
	return request({
		method: 'get',
		url: `/posts/date/${date}`,
		params:{
			currentPage: currentPage
		}
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