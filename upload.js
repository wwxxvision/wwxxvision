const fs = require('fs');
const readline = require('readline');
const { exec } = require('child_process');
const path = require('path');
const config = {
  DATABASE: {
    localhost: 'localhost',
    name: 'crm_10actual',
    username: 'root',
    password: 'QDQDQD123123aa!!',
    port: 3307,
  },
  SOCKET: {
    serverPort: 8103,
    port: 443
  }
}

console.log(`\x1b[31m ==== AUTO CONFIG CRM ==== ` )

const CURENT_DERICTORY = path.basename(process.cwd());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pathes = [
  {
    url: `${__dirname}/application/config/database.php`,
    name: 'PATH_DB_CONFIG'
  },
  {
    url: `${__dirname}/application/config/config.php`,
    name: 'PATH_APP_CONFIG'
  },
  {
    url: `${__dirname}/system/database/drivers/mysqli/mysqli_driver.php`,
    name: 'PATH_SYSTEM_DRIVER'
  },
]


pathes.forEach((path) => {
  let file = fs.readFileSync(path.url, 'utf-8');

  switch (path.name) {
    case 'PATH_DB_CONFIG':
      let localhost = file.match(/'localhost' =>.*/gm),
        name = file.match(/'database' =>.*/gm),
        username = file.match(/'username' =>.*/gm),
        password = file.match(/'password' =>.*/gm),
        port = file.match(/\$db\['default'\] = array\(/gm),
        hasPort = file.match(/'port' =>.*/gm);

      file = file.replace(localhost[0], `'localhost' => '${config.DATABASE.localhost}',`);
      file = file.replace(name[0], `'database' => '${config.DATABASE.name}',`);
      file = file.replace(username[0], `'username' => '${config.DATABASE.username}',`);
      file = file.replace(password[0], `'password' => '${config.DATABASE.password}',`);

      if (!hasPort) {
        file = file.replace(port[0], port[0].concat(`\n\t'port' => ${config.DATABASE.port},`));
      }

      else {
        file = file.replace(hasPort[0], `'port' => ${config.DATABASE.port},`);
      }
      
      rl.question('Need run: php index.php Seed run ? (true|false): \t', (answer) => {
        answer = answer.toUpperCase();

        if (answer === 'TRUE' || answer === 'FALSE') {
          if (answer === 'TRUE') {
            let seedRunPhp = exec('php index.php Seed run', (err, stdout, stderr) => {
              if (err) console.log(err);
              if (stderr) console.error(`ERROR: ${stderr}`);

              if (stdout) {
                console.log(`RESULT: ${stdout}`);
              }

              seedRunPhp.kill();
              return;
            });
          }
        }

        else {
          console.log('============================ \n Your answer must be true or false ');
        }

        rl.close();
      })
      break;
    case 'PATH_APP_CONFIG':
      let baseUrl = file.match(/\$config\['base_url'\].*/gm),
        serverPort = file.match(/\$config\['socket_server_port'\].*/gm),
        socket = file.match(/\$config\['socket_server'\].*/gm),
        socketPort = file.match(/\$config\['socket_port'\].*/gm);

      file = file.replace(baseUrl[0], `$config['base_url'] = 'https://${CURENT_DERICTORY}.osora.ru/';`);
      file = file.replace(serverPort[0], `$config['socket_server_port'] = '${config.SOCKET.serverPort}';`);
      file = file.replace(socket[0], `$config['socket_server'] = 'wss://wss${config.SOCKET.serverPort}.osora.ru';`);
      file = file.replace(socketPort[0], `$config['socket_port'] = ${config.SOCKET.port};`);
      break;
    case 'PATH_SYSTEM_DRIVER':
      let repairing = file.match(/\$this->hostname\[0\] === '\/'/gm);
      file = file.replace(repairing[0], `!empty($this->hostname[0]) \n&& $this->hostname[0] === '/'`);
      break;
    default:
      console.log('This is path not supported yet');
  }
  fs.writeFileSync(path.url, file, { encoding: 'utf-8' });
});






