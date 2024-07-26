const path = require('path')
const db = require('electron-db')
const fs = require("fs");

const dbLocation = path.join(__dirname, '')

class dbFunctions {
    dbName;

    constructor(dbName){
        this.dbName = dbName
    }

    #validDb = () => {
        if(fs.existsSync(dbLocation+'/'+this.dbName+'.json')) return true;
        else return false
    }

    openDb = async () => {
        let res, msg
        db.createTable(this.dbName, dbLocation, (succ, mssg) => {
            res = succ
            msg = mssg
        })

        if(res && msg == 'Success!'){
            return true
        }
        else if(!res && msg == this.dbName+'.json already exists!')
            return true
        else
            return false
    }

    getAllData = async () => {
        if(this.#validDb){
            let res
            db.getAll(this.dbName, dbLocation,(succ, msg) => {
                if(succ) res = msg
                else res = false
            })
            return res
        }
        return false
    }

    getSpecificData = async (id) => {
        if(this.#validDb){
            let res
            db.getRows(this.dbName, dbLocation, {id: id}, (succ, msg) => {
                if(succ && msg.length > 0) res = msg
                else res = false
            })
            return res
        }
    }

    insertData = async (data) => {
        if(this.#validDb){
            let res
            db.insertTableContent(this.dbName, dbLocation, data, (succ, msg) => {
                if(succ) res = succ
                else res = false
            })
            return res
        }
    }

    deleteData = async (id) => {
        if(this.#validDb){
            let res
            db.deleteRow(this.dbName, dbLocation, {id: id}, (succ, msg) => {
                res = succ
            })
            return res
        }
    }
    
    updateData = async (id, set) => {
        if(this.#validDb){
            let res
            db.updateRow(this.dbName, dbLocation, {id: id}, set, (succ, msg) => {
                console.log(succ)
                console.log(msg)
            })
        }
    }

}

module.exports = dbFunctions