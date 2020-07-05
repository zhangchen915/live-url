const fetch = require('node-fetch');

async function getUrl(roomId = 3484) {
	try	{
		const res = await fetch(`https://www.douyu.com/${roomId}`)
		const body = await res.text();
		const id =body.match(/live\/(\S*)_/)[1]
		return `http://tx2play1.douyucdn.cn/live/${id}.flv?uuid=`
	}catch (e) {
	}
}

module.exports = getUrl

