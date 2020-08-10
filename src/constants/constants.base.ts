import * as path from 'path';

export const HAKONIWA_BASE_DIR = path.join('.', 'hakoniwa');
export const HAKONIWA_AUTH_DIR = path.join(HAKONIWA_BASE_DIR, 'auth');
export const HAKONIWA_SECRETS_DIR = path.join(HAKONIWA_BASE_DIR, 'secrets');
export const HAKONIWA_PROXY_DIR = path.join(HAKONIWA_BASE_DIR, 'proxy');
export const HAKONIWA_CYPRESS_DIR = path.join('.', 'cypress');
export const HAKONIWA_CYPRESS_WEBPACK_CONFIG_PATH = path.join(HAKONIWA_CYPRESS_DIR, 'webpack.cypress.config.js');
export const HAKONIWA_CYPRESS_TSCONFIG_PATH = path.join(HAKONIWA_CYPRESS_DIR, 'tsconfig.json');
export const HAKONIWA_CYPRESS_PLUGINS_PATH = path.join(HAKONIWA_CYPRESS_DIR, 'plugins', 'index.js');
export const HAKONIWA_PROXY_HTTPS_CERT_DIR = path.join(HAKONIWA_SECRETS_DIR, 'cert');
export const HAKONIWA_PROXY_HOST = 'localhost';
export const HAKONIWA_PROXY_IDENTIFIER = 'default';
export const HAKONIWA_PROXY_PORT = 11111;
export const HAKONIWA_PROXY_PROTOCOL = 'http';
export const HAKONIWA_DAEMON_PROXY_IDENTIFIER = 'daemon';
export const HAKONIWA_DAEMON_PROXY_PORT = 11110;
export const HAKONIWA_DAEMON_PROXY_RULE_NAME = 'daemon';
export const HAKONIWA_CYPRESS_UNLIMIT_TIMEOUT = 31536000000;