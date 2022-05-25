import { Types, Request } from 'tedious'; 
import { connection } from '../config/databaseConnection.js';

//https://tediousjs.github.io/tedious/api-request.html
async function handleRequest(query, params) {
    connection.connect();
    const request = new Request( query , (error) => {
        if (error) {
            console.log(error);
            return { error };
        }
    });

    params?.forEach( param => {
        request.addParameter( param.name, param.type, param.value );
    })

    //add a listener
    request.on("done", (rowCount, more, rows) => {
        connection.close();
        return { rowCount, more, rows }
    });

    connection.execSql(request);
}


export async function selectPersons(req, res) { 
    const response = await handleRequest('SELECT * FROM Person')
    if (response.error) {
        return res.status(401).json({ "error": response.error })
    }
    if (response.rowCount > 0) {
        return res.status(200).json({ "rows": response.rows })
    }
}

export async function selectPerson(req, res){
    let id = req.body.id;
    const response = await handleRequest(`SELECT * FROM Person WHERE id=${id}`)
    if (response.error) {
        return res.status(401).json({ "error": response.error })
    }
    if (response.rowCount > 0) {
        return res.status(200).json({ "rows": response.rows })
    }
}

export async function insertPerson(req, res){
    const { person } = req.body;
    const response = await handleRequest('INSERT INTO Person (name, age) VALUES (@name, @age)', [
        { name: 'name', type: Types.VarChar, value: person.name },
        { name: 'age', type: Types.VarChar, value: person.age },
    ]);

    if (response.error) {
        return res.status(401).json({ "error": response.error })
    }
    if (response.rowCount > 0) {
        return res.status(200);
    }
}

export async function updatePerson(req, res){
    const { person } = req.body;
    const response = await handleRequest('UPDATE Person SET nome=@name, idade=@age WHERE id=@id', [
        { name: 'id', type: Types.VarChar, value: person.id },
        { name: 'name', type: Types.VarChar, value: person.name },
        { name: 'age', type: Types.VarChar, value: person.age },
    ]);

    if (response.error) {
        return res.status(401).json({ "error": response.error })
    }
    if (response.rowCount > 0) {
        return res.status(200);
    }
}