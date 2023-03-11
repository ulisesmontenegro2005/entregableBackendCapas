import { getUserByUsername, createUserPersistence, comparePassBcrypt, getCompleteUser } from "../persistence/persistence.js"

const infoObject = async () => {
    return {
        argsEntrada: process.argv,
        sistema: process.platform,
        node: process.versions.node,
        memoriaReservada: process.memoryUsage().rss,
        pathExec: process.execPath,
        pid: process.pid,
        carpetaProyecto: process.argv[1].split('/')[6]
    }
}

const getUser = async (username) => {
    return await getUserByUsername(username)
}

const completeUserByUsername = async (username) => {
    return await getCompleteUser(username)
}

const createUser = async (obj) => {
    await createUserPersistence(obj);
    return obj
}

const comparePassword = async (pass1, pass2) => {
    return await comparePassBcrypt(pass1, pass2);
}

export {
    infoObject,
    getUser,
    createUser,
    comparePassword,
    completeUserByUsername
}