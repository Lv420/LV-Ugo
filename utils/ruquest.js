export default ({url,method,data})=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:'https://api-hmugo-web.itheima.net/api/public/v1'+url,
			method,
			data
		}).then(res=>{
			// console.log(res[1])
			resolve(res[1])
			
		})
	})
}