const parseIt = require('./utils/parseIt');
var logger = require('tracer').colorConsole();
const axios = require("axios");
const fs = require('fs')
const path = require("path");

module.exports.parseResumeFile = function (inputFile) {
	return new Promise((resolve, reject) => {
		parseIt.parseResumeFile(inputFile, function (file, error) {
			if (error) {
				return reject(error);
			}
			return resolve(file);
		});
	});
};

module.exports.parseResumeUrl = function (url) {

	const Uri = new URL(url)
	const fname = path.basename(Uri.pathname)

	const inputFile = `${process.cwd()}/${fname}`;
	const writer = fs.createWriteStream(inputFile);


	axios({
		url,
		method: 'GET',
		responseType: 'stream'
	})
	.then(({ data }) => {
		data.pipe(writer)
	})

	return new Promise((resolve, reject) => {
		writer.on('finish', ()=>{
			parseIt.parseResumeFile(inputFile, function (file, error) {
				if (error) {
					return reject(error);
				}
			
				fs.unlink(inputFile,()=>{});
				
				return resolve(file);
			});
		})

		writer.on('error', reject)
	})
};

module.exports.parseResumeText = function (text) {

	return new Promise((resolve, reject) => {
		parseIt.parseResumeText(text, function (file, error) {
			if (error) {
				return reject(error);
			}
			return resolve(file);
		});
	});
};