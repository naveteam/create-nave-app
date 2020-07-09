#!/usr/bin/env node

const shell = require('shelljs')
const colors = require('colors')
const argv = require('yargs').argv
const appName = argv._[0]

const repository = () => {
    if (argv.backend) return 'https://github.com/naveteam/back-boilerplate.git'
    if (argv.typescript) return 'https://github.com/naveteam/react-boilerplate-typescript.git'
    if (argv.next) return 'https://github.com/naveteam/next-boilerplate.git'
    if (argv.native) return 'https://github.com/naveteam/react-native-template.git'
    if (argv.gatsby) return 'https://github.com/naveteam/gatsby-template.git'
    if (argv.storyblok) return 'https://github.com/naveteam/storyblok-gatsby-boilerplate.git'
    return 'https://github.com/naveteam/react-boilerplate.git'
}

const run = async () => {
    if (!shell.which('git')) {
        console.log('Esse script precisa do Git instalado para seu funcionamento'.red)
        shell.exit(1)
    }

    if (!appName) {
        console.log('Por favor informe o nome do repositório'.red)
        shell.exit(1)
    }

    console.log('\nClonando o repositório'.cyan)
    shell.exec(`git clone ${repository()} ${appName} -q`)
    shell.cd(appName)

    shell.sed('-i', /"name":\s?".+"/, `"name": "${appName}"`, 'package.json')
    
    console.log('\nIniciando o repositório'.cyan)
    shell.rm('-rf', '.git')
    shell.exec('git init')
    shell.exec('git add .')
    shell.exec('git commit -m "Initial commit using Create Nave App" -q')
    
    console.log('\nInstalando as dependências\n'.cyan)
    if (!argv.native) {
        if (shell.which('yarn')) {
            shell.exec('yarn')
        } else {
            shell.exec('npm install')
        }
    }

    console.log()
    console.log()
    console.log('Seu projeto está pronto para ser iniciado!'.green)
    console.log()
    console.log('Para iniciar o desenvolvimento, execute')
    console.log()
    console.log(`  cd ${appName}`)
    if (shell.which('yarn')) {
        console.log('  yarn start')
    } else {
        console.log('  npm run start')
    }
    console.log()
    console.log()
    console.log('Divirta-se!'.rainbow)
    console.log('#naveteam'.magenta)
}

run()