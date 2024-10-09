const { exec } = require('child_process');

const server = exec('cd server && npm start');

const client = exec('cd client && npm start');

server.stderr.on('data', (data) => {
    console.error(`Server error: ${data}`);
});

client.stderr.on('data', (data) => {
    console.error(`Client error: ${data}`);
});

server.on('exit', (code) => {
    console.log(`Server exited with code ${code}. Restarting...`);
    exec('cd server && npm start');
});

client.on('exit', (code) => {
    console.log(`Client exited with code ${code}. Restarting...`);
    exec('cd client && npm start');
});

console.log('Server and client are running...');
