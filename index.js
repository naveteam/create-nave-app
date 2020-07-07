#!/usr/bin/env node

const shell = require('shelljs')
const colors = require('colors')
const fs = require('fs') //fs already comes included with node.

const appName = process.argv[2]
const appDirectory = `${process.cwd()}/${appName}`
const templates = require('./templates/templates.js')

const createReactApp = () => {
    return new Promise(resolve => {
        if (appName) {
            shell.exec(`npx create-react-app ${appName}`, () => {
                console.log("Created react app")
                resolve(true)
            })
        } else {
            console.log("\nNo app name was provided.".red)
            console.log("\nProvide an app name in the following format: ")
            console.log("\ncreate-nave-app ", "app-name\n".cyan)
            resolve(false)
        }
    })
}

const installPackages = () => {
    return new Promise(resolve => {
        console.log("\nInstalling react-router-dom, axios and styled-components\n".cyan)
        shell.exec(`cd ${appName} && npm install --save react-router-dom styled-components`, () => {
            console.log("\nFinished installing packages\n".green)
            resolve()
        })
    })
}

const updateTemplates = () => {
    return new Promise(resolve => {
        let promises = []
        Object.keys(templates).forEach((fileName, i) => {
            promises[i] = new Promise(res => {
                fs.writeFile(`${appDirectory}/src/${fileName}`, templates[fileName], function (err) {
                    if (err) { return console.log(err) }
                    res()
                })
            })
        })
        Promise.all(promises).then(() => { resolve() })
    })
}

const updateGit = () => {
    return new Promise(resolve => {
        shell.exec(`cd ${appName} && git add . && git commit --amend --no-edit`, () => {
            resolve()
        })
    })
}

const run = async () => {
    let success = await createReactApp()
    if (!success) {
        console.log('Something went wrong while trying to create a new React app using create-react-app'.red)
        return false;
    }
    await installPackages()
    await updateTemplates()
    await updateGit()
    console.log("All done")
}

run() 