#!/usr/bin/env node

const shell = require('shelljs')

const appName = process.argv[2]

const run = async () => {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git')
        shell.exit(1)
    }

    shell.exec(`git clone git@github.com:naveteam/react-boilerplate ${appName}`)
    shell.cd(appName)

    shell.sed('-i', 'react-boilerplate', appName, 'package.json')
    
    shell.rm('-rf', '.git')
    shell.exec('git init')
    shell.exec('git add .')
    shell.exec('git commit -m "Initial commit using Create Nave App" --quiet')
    
    if (shell.which('yarn')) {
        shell.exec('yarn')
    } else {
        shell.exec('npm install')
    }

    console.log("All done")
}

run()