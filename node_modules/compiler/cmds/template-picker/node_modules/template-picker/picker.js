var fs = require('fs'),
	path = require('path'),
	nf = require('node-file')
	;
var jstemplate = require('./jstemplate.js'),
	ztool = require('./ztool.js')
	;

var DEFAULT_CONFIG = {
	source: null,
	target: './',
	templateOutput: null,
	templatePlaceholder: '/*%HtmlTemplateFunctions%*/',
	compressWhitespace: false
}

var tmplRegexp = /<script\s*id="([^"]+)"\s*type="text\/template"\s*>([\s\S]*?)<\/script>/ig;
var tmplRegexp2 = /<script\s*type="text\/template"\s*id="([^"]+)"\s*>([\s\S]*?)<\/script>/ig;

var result;

var readConfig = function(config){
	if(ztool.isString(config)){
        var content = fs.readFileSync(config).toString();
        config = ztool.jsonParse(content);
    }
    config = ztool.merge({}, DEFAULT_CONFIG, config);
    if(ztool.isString(config.source)){
    	config.source = [config.source];
    }
    return config;
}

var pickup = function(match, tid, tmpl){
	tmpl = tmpl.replace(/\n|\r/g, '');
	var func = jstemplate.compile(tmpl);
	func = func.toString();
	var prefix = 'function anonymous';
	if(func.indexOf(prefix) == 0) {
		func = func.replace(prefix, 'function');
	}
	func = 'this.' + tid + '=' + func;
	result.push(func);
	return '';
}

var exec = function(configFile){
	var content, fileName;
	var config = readConfig(configFile);
	result = [];
	// console.log(config);
	for(var i = 0; i < config.source.length; i++) {
		fileName = config.source[i];
		content = fs.readFileSync(fileName).toString();
		content = content.replace(tmplRegexp, pickup);
		content = content.replace(tmplRegexp2, pickup);

		fileName = path.join(config.target, path.basename(fileName));
		console.log('output', fileName);
		nf.writeFileSync(fileName, content);
	}
	content = result.join('\n');
	if(config.compressWhitespace){
		content = content.replace(/[\t ]+/g, ' ');
	}
	var tmpl = fs.readFileSync(config.templateOutput).toString();
	tmpl = tmpl.replace(config.templatePlaceholder, content);
	fileName = path.join(config.target, config.templateOutput);
	console.log('output', fileName);
	nf.writeFileSync(fileName, tmpl);
}

exports.exec = exec;

var isInCommandLine = function(){
	var filename = process.argv[1];
	if(filename && path.basename(filename) === path.basename(__filename)){
		return true;
	}
	return false;
}

if(isInCommandLine()){
	exec(process.argv[2]);
}

