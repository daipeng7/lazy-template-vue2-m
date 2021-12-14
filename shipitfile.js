/*
 * @Author: daipeng7
 * @Date: 2021-12-14 13:53:53
 * @LastEditTime: 2021-12-14 13:53:53
 * @LastEditors: daipeng7
 * @Description:
 */
'use strict';

module.exports = function(shipit) {
	require('shipit-deploy')(shipit);
	const envName = shipit.options.environment;
	const repositoryUrl = 'git@gitee.com:daipeng7/physique-h5.git';
	const DeployPath = '/data/project/physique-h5';
	const pm2ConfigPath = `./pm2/${envName}.json`;
	const pm2Config = require(pm2ConfigPath);
	const Workspace = './shipit/physique-h5';

	shipit.initConfig({
		qa: {
			servers: 'root@106.54.232.245:22',
			deployTo: DeployPath,
			branch: 'master'
		},
		pre: {
			servers: 'root@106.54.95.88:22',
			deployTo: DeployPath,
			branch: 'master'
		},
		prod: {
			servers: 'root@106.54.95.88:22',
			deployTo: DeployPath,
			branch: 'master'
		},
		default: {
			workspace: Workspace,
			deployTo: DeployPath,
			repositoryUrl: repositoryUrl,
			rsync: true,
			ignores: ['.git', 'node_modules', 'src', 'config', 'build', 'test', '.vscode'],
			keepReleases: 2,
			shallowClone: false,
			deleteOnRollback: false
		}
	});

	// 创建临时目录
	shipit.on('init', () => {
		return shipit.local(`mkdir -p ${Workspace}`);
	});

	// 本地构建项目，然后拷贝需要的目录到部署服务器
	shipit.blTask('build', function() {
		const env = shipit.options.environment;
		const command = [
		  `cd ${Workspace}`,
		  'npm install',
		  `npm run build`
		].join(' && ');
		return shipit.local(command);
	  });

	  shipit.on('fetched', function() {
		shipit.start(['build']);
	  });

	shipit.on('published', function() {
		if (pm2ConfigPath) {
			const command = [
				`npm install ${DeployPath}/current/server`,
				`cd ${DeployPath}/current`,
				`(pm2 delete ${pm2Config.apps[0].name} || echo 创建项目)`,
				`pm2 start ${pm2ConfigPath}`,
				'pm2 save'
			];
			return shipit.remote(command.join(' && '));
		}
	});
};
