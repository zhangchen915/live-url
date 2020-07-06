const inquirer = require('inquirer');
const cp = require('child_process');
const Conf = require('conf');

const getPlatformUrl = require('./src/platform')
const config = new Conf({
	configName: 'live-url'
});

const PotPlayer = config.get('PotPlayer')

const setConfig = [
	{
		type: 'input',
		name: 'PotPlayer',
		message: "PotPlayer播放器所在路径，如 C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe"
	}
]
const selectLive = [
	{
		type: 'list',
		name: 'platform',
		message: "选择直播平台",
		choices: [{name: '斗鱼', value: 'DY'}, {name: '虎牙', value: 'HY'}],
	},
	{
		type: 'input',
		name: 'room',
		message: "输入直播间号",
		validate: input => !!input
	}
];

async function runPotPlayer({platform, room}) {
	const url = await getPlatformUrl[platform](room);
	if(!url) console.log('直播地址获取失败')
	console.log('直播真实地址是 ', url)
	const player = cp.spawn(PotPlayer, [url],{
		detached: true,
		stdio: 'ignore'
	});
	player.unref();
}

const prompt = (PotPlayer ? [] : setConfig).concat(selectLive)
inquirer.prompt(prompt).then(ans => runPotPlayer(ans));
