import fs from 'fs';
import os from 'os';

let envContents = fs.readFileSync('.env', 'utf8');

let newCodespacesValue = process.env.CODESPACES;
let newCodespaceNameValue = process.env.CODESPACE_NAME;

envContents = envContents.replace(/(VITE_APP_CODESPACES=).*/g, `$1${newCodespacesValue}`);
envContents = envContents.replace(/(VITE_APP_CODESPACE_NAME=).*/g, `$1${newCodespaceNameValue}`);

fs.writeFileSync('.env', envContents, 'utf8');