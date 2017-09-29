#!/usr/bin/env node
const chalk = require('chalk');
const commander = require('commander');
const http = require('http');

http.get(`http://horoscope-api.herokuapp.com/horoscope/${process.argv[2]}/${process.argv[3]}`, (res) => {

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      parsedData = parsedData.horoscope.replace(/\\n/g, ' ').replace(/\]|\[|\' |\ '|\  /g, '');
       console.log(parsedData);
      
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
