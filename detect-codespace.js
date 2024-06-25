import fs from 'fs';
import process from 'node:process';

let envContents = fs.readFileSync('.env', 'utf8');

let newCodespacesValue = process.env.CODESPACES !== undefined ? process.env.CODESPACES : 'undefined';
let newCodespaceNameValue = process.env.CODESPACE_NAME !== undefined ? process.env.CODESPACE_NAME : 'undefined';

envContents = envContents.replace(/(VITE_APP_CODESPACES=).*/g, `$1${newCodespacesValue}`);
envContents = envContents.replace(/(VITE_APP_CODESPACE_NAME=).*/g, `$1${newCodespaceNameValue}`);

fs.writeFileSync('.env', envContents, 'utf8');