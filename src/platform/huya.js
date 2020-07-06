const fetch = require('node-fetch');
const crypto = require('crypto')

function live(url){
	const urlInfo = new URL(`https:${url}`)
	const fm = urlInfo.searchParams.get('fm')
	const wsTime = urlInfo.searchParams.get('wsTime')
	const ctype = urlInfo.searchParams.get('ctype')

	const i = url.split('?')[0]
	const r = i.split('/')

	const s = r.pop().match(/([\s\S]*).(flv|m3u8)/)[1]
	const u = Buffer.from(fm, 'base64').toString('ascii')
	const p = u.split('_')[0]
	const f = + new Date() * 1e3
	const t = '0'
	const h = [p, t, s, f, wsTime].join('_')
	const m = crypto.createHash('md5').update(h).digest("hex");
	return `https:${i}?wsSecret=${m}&wsTime=${wsTime}&u=${t}&seqid=${f}&ctype=${ctype}`
}

async function getUrl(roomId) {
	try	{
		const res = await fetch(`https://m.huya.com/${roomId}`, {
			headers: {'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Mobile Safari/537.36'},
		})
		const body = await res.text();
		const url = body.match(/hasvedio: '([\s\S]*)' \?/)[1]
		if (url) {
			return live(url)
		} else {
			console.log('直播未开始或不存在')
		}
	}catch (e) {
	}
}

module.exports = getUrl
