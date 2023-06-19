import { deepmerge } from 'deepmerge-js'
import wdioConf from './wdio.conf.js'
exports.config = deepmerge(wdioConf.config,{

waitForTimepout :1000,


})