#!/usr/bin/env node

import fs from 'fs'

const appdata = process.env.APPDATA + '/../'
const path = `${appdata}/Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/LocalState/settings.json`

fs.readFile(path, (err, data) => {
  if (err) return console.log(err)
  const replaceData = data
    .toString()
    .replace(/"startingDirectory":.*/, (match) => {
      const isCommaOnTheEnd = match[match.length - 1] === ',' ? ',' : ''
      const currentDir =
        `"${process.cwd().replace(/\\/g, '/')}"` + isCommaOnTheEnd

      return `"startingDirectory": ${currentDir}`
    })
  fs.writeFile(path, replaceData, (err) => {
    if (err) return console.log(err)
  })
})
