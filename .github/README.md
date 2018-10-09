# GTA V Roleplay Gamemode
🎮 GTA:V roleplay multiplayer server. Based on Node, built with Sequelize. This repository contains source files of server gamemode.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

:warning: **This gamemode is currently in development state, you shouldn't run it on production server.** :warning:

## Requirements
1.  SQL Server, preferred MariaDB
2.  Node.js installed on machine

## Server setup
1.  Download or clone the repository,
2.  Extract the files to your RAGE-MP server-files folder,
3.  Using a command prompt window execute steps below:
    - Switch into your server directory,
    - `npm install` or `yarn install`,
    - Create your environment file `.env` based on `.env.example` file,
    - Setup database - `./node_modules/.bin/sequelize db:create` & `./node_modules/.bin/sequelize db:migrate`,
    - Build client files with command `npm run dev` or `npm run production`.
4.  You are ready to go. Run server :sparkles:

## Scripts inside

- `npm run hot`: runs `webpack-dev-server` with hot reload. Open `localhost:8080/dist/[view_name]/` to access it.

- `npm run dev`: builds files to `dist/` directory for once with development mode.

- `npm run prod`: clears `dist/` as well `src/` :exclamation: directories & build files with minification.

- `npm run start`: starts server and monitor all changes in files under `client_packages` and `packages` directory.

## Contributing

Before contibuting, please make sure your code is formatted along with [JavaScript Standard Style](http://standardjs.com) or use eslint config included in the package.
