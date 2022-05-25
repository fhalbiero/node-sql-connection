import { Connection } from 'tedious';

const config = {  
    server: 'your_server.database.windows.net',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'your_username', //update me
            password: 'your_password'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'your_database'  //update me
    }
};  

export const connection = new Connection(config);  

connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});

connection.connect();