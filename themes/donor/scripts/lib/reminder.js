'use strict';

const https       = require('https');
const path        = require('path');
const { version } = require(path.normalize('../../package.json'));

module.exports = hexo => {
	// 透過 github api 取得 repo 發布資訊
  	https.get('https://api.github.com/repos/theme-next/hexo-theme-next/releases/latest', {
	    headers: {
	      'User-Agent': 'Theme NexT Client'
	    }
	}, res => {
		var releaseInfo = '';
		res.on('data', data => {
      		releaseInfo += data;
    	});

		res.on('end', data => {
      		try {
      			var latest = JSON.parse(releaseInfo).tag_name.replace('v', '').split('.');
      			var current = version.split('.');
      			var isOutdated = false;
		        for (var i = 0; i < Math.max(latest.length, current.length); i++) {
		          if (! current[i] || latest[i] > current[i]) {
		            isOutdated = true;
		            break;
		          }
		        }
      			if (isOutdated) {
		          	hexo.log.warn(`Your theme Donor is outdated. Current version: v${version}, latest version: v${latest.join('.')}`);
		          	hexo.log.warn('Visit https://github.com/mr-donor/hexo-theme-donor/releases for more information.');
		        }
      		} catch (error) {
      			hexo.log.error('Failed to detect version info. Error message:');
      			hexo.log.error(err);
      		}
    	});

	}).on('error', err => {
	    hexo.log.error('Failed to get release info. Error message:');
	    hexo.log.error(err);
	});
}