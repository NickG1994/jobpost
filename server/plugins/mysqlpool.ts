import mysql from 'mysql2/promise'
export default defineNitroPlugin((nitroApp:any) => {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER,   
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'test',
        connectionLimit: 10, // Adjust as needed    
        waitForConnections: true, 
        queueLimit: 0 // No limit on the queue
    })

    nitroApp.hooks.hook('request', (event: Event) => {
        event.context.mysqlPool = pool
    })
})
