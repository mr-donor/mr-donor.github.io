'use strict';


hexo.log.info(`
══════════════════════════════════════════════
 ██████╗  ██████╗ ███╗   ██╗ ██████╗ ██████╗ 
 ██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔══██╗
 ██║  ██║██║   ██║██╔██╗ ██║██║   ██║██████╔╝
 ██║  ██║██║   ██║██║╚██╗██║██║   ██║██╔══██╗
 ██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║
 ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝
══════════════════════════════════════════════
 https://github.com/mr-donor/hexo-theme-donor
──────────────────────────────────────────────
`);



hexo.on('ready', () => {
	const path   = require('path');
	const fs     = require('hexo-fs');
	const checkDependency = function(name) {
	    try {
	        require.resolve(name);
	        return true;
	    } catch(e) {
	        hexo.log.error(`Package ${name} is not installed.`)
	    }
	    return false;
	}

	const missingDeps = [
	    'hexo-generator-archive',
	    'hexo-generator-category',
	    'hexo-generator-index',
	    'hexo-generator-tag',
	    'hexo-renderer-ejs',
	    'hexo-renderer-marked',
	    'hexo-renderer-scss',
	].map(checkDependency).some(installed => ! installed);

	hexo.log.info('Checking dependencies...');
	if (missingDeps) {
	    hexo.log.error('Please install the missing dependencies in the root directory of your Hexo site.');
	    process.exit(-1);
	}

	const themePath  = hexo.theme_dir;
	const configPath = path.join(themePath, '_config.yml');

	hexo.log.info('Checking config file...');
	if (! fs.existsSync(configPath)) {
	    hexo.log.warn(`${configPath} is not found. Please create _config.yml from template.`)
	}

});

hexo.on('generateBefore', () => {

});

hexo.on('generateAfter', () => {
	if (hexo.theme.config.reminder) require('./lib/reminder')(hexo);

});