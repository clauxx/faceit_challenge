// @ts-ignore
import ip from 'ip'
// @ts-ignore
import shell from 'shelljs'
// @ts-ignore
import fs from 'fs'

const PORT = 3000
const address = ip.address()

// NOTE not using .env 
fs.writeFileSync("./.env", `IP=${address}\nPORT=${PORT}\n`)
shell.exec(`json-server --watch ./server/db.json --port ${PORT} --host ${address}`)

