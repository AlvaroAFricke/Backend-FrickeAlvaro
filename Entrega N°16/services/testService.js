/**
 * @returns informacion de proceso
 */

const getInfo = () => {
    const info = {
        Argumentos: process.argv.slice(2),
        SO: process.platform,
        Version: process.version,
        PID: process.pid,
        Path: process.execPath,
        Ejecucion: process.cwd(),
        Memoria: process.memoryUsage(),
    }
    return JSON.stringify(info)
}

/**
 * @returns informacion comprimida de proceso
 */

import compression from "compression";

const getInfoZip = (compression(), () => {
    const info = {
        Argumentos: process.argv.slice(2),
        SO: process.platform,
        Version: process.version,
        PID: process.pid,
        Path: process.execPath,
        Ejecucion: process.cwd(),
        Memoria: process.memoryUsage(),
    }
    return JSON.stringify(info)
})

/**
 * exports
 */

export default {
    getInfo,
    getInfoZip
}