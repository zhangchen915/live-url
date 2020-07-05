const getPlatformUrl = require('./src/platform')
const inquirer = require('inquirer');
const Conf = require('conf');
const config = new Conf({
	configName: 'live-url'
});

const PotPlayer = config.get('PotPlayer')
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
}

if (PotPlayer)
	inquirer
		.prompt(selectLive)
		.then(ans => {
			runPotPlayer(ans)
		});

else
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'PotPlayer',
				message: "PotPlayer播放器所在路径，如 C:\\Program Files\\DAUM\\PotPlayer\\PotPlayerMini64.exe"
			}
		])
		.then(ans => {
			runPotPlayer(ans)
		});


