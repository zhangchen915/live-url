const inquirer = require('inquirer');
const {execFile} = require('child_process');
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
		choices: [{name: '斗鱼', value: 'DY'}],
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
	execFile(PotPlayer, [url], (err, stdout, stderr) => {
		if (err) return console.log(err);
	});
}

const prompt = (PotPlayer ? [] : setConfig).concat(selectLive)
inquirer
	.prompt(prompt)
	.then(ans => {
		runPotPlayer(ans)
	});


