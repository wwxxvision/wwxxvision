const config = require('./config');
const fs = require('fs');


const PATH_DB_CONFIG = `${__dirname}/application/config/database.php`;

fs.readFile(PATH_DB_CONFIG, 'utf-8', (err, file) => {
  if (err) throw err;
  
  let localhost = file.match(/'localhost' =>.*/gm),
    name = file.match(/'database' =>.*/gm),
    username = file.match(/'username' =>.*/gm),
    password = file.match(/'password' =>.*/gm),
    port = file.match(/\$db\['default'\] = array\(/gm),
    hasPort = file.match(/'port' =>.*/gm);
  
    file =  file.replace(localhost[0], `'localhost' => '${config.DATABASE.localhost}',`);
    file = file.replace(name[0], `'database' => '${config.DATABASE.name}',`);
    file = file.replace(username[0], `'username' => '${config.DATABASE.username}',`);
    file = file.replace(password[0], `'password' => '${config.DATABASE.password}',`);

    if (!hasPort) {
      file =  file.replace(port[0], port[0].concat(`\n\t'port' => ${config.DATABASE.port},`));
    }
    
    else {
      file = file.replace(hasPort[0], `'port' => ${config.DATABASE.port},`);
    }


  fs.writeFile(PATH_DB_CONFIG, file, 'utf-8', function (err) {
    if (err) throw err;
 
  });

})