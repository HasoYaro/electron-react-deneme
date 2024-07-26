const { contextBridge, ipcRenderer } = require('electron')
require('dotenv').config()
const dbFunctions = require('./database/database')

let openDb = async () => {
    let succ = [];
    let dbs = process.env.DATABASES.split(',')

    for(const db of dbs){
        succ.push(await new dbFunctions(db).openDb().then((res) => {return res}))
    }

    if(succ.includes(false)) return false;
    else return true;
}

let getAllData = async (db) => {
    return await new dbFunctions(db).getAllData().then((res) => {return res})
}

let getSpecificData = async (db, id) => {
    return await new dbFunctions(db).getSpecificData(id).then((res) => {return res})
}

let insertData = async (db, data) => {
    return await new dbFunctions(db).insertData(data).then((res) => {return res})
}

let deleteData = async (db, id) => {
    return await new dbFunctions(db).deleteData(id).then((res) => {return res})
}

let updateData = async (db, id, set) => {
    return await new dbFunctions(db).updateData(id, set).then((res) => {return res})
}

contextBridge.exposeInMainWorld('Api', {
    loading: (state) => {if(!state) ipcRenderer.send('loading', state)},
    updateState: (callback) => {ipcRenderer.on('updateState', callback)},

    openDb: () => openDb(),
    getAllData: (db) => getAllData(db),
    getSpecificData: (db, id) => getSpecificData(db, id),
    insertData: (db, data) => insertData(db, data),
    deleteData: (db, id) => deleteData(db, id),
    updateData: (db, id, set) =>updateData(db, id, set),

})