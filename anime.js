// fs.readFile(PATH_DB_CONFIG, 'utf-8', (err, file) => {
//   if (err) throw err;

//   let localhost = file.match(/'localhost' =>.*/gm),
//     name = file.match(/'database' =>.*/gm),
//     username = file.match(/'username' =>.*/gm),
//     password = file.match(/'password' =>.*/gm),
//     port = file.match(/\$db\['default'\] = array\(/gm),
//     hasPort = file.match(/'port' =>.*/gm);

//   file = file.replace(localhost[0], `'localhost' => '${config.DATABASE.localhost}',`);
//   file = file.replace(name[0], `'database' => '${config.DATABASE.name}',`);
//   file = file.replace(username[0], `'username' => '${config.DATABASE.username}',`);
//   file = file.replace(password[0], `'password' => '${config.DATABASE.password}',`);

//   if (!hasPort) {
//     file = file.replace(port[0], port[0].concat(`\n\t'port' => ${config.DATABASE.port},`));
//   }

//   else {
//     file = file.replace(hasPort[0], `'port' => ${config.DATABASE.port},`);
//   }


//   fs.writeFile(PATH_DB_CONFIG, file, 'utf-8', (err) => {
//     if (err) throw err;

//     rl.question('Need run: php index.php Seed run ? (true|false): \t', (answer) => {
//       answer = answer.toUpperCase();

//       if (answer === 'TRUE' || answer === 'FALSE') {
//         if (answer === 'TRUE') {
//           let seedRunPhp = exec('php index.php Seed run', (err, stdout, stderr) => {
//             if (err) console.log(err);
//             if (stderr) console.error(`ERROR: ${stderr}`);

//             if (stdout) {
//               console.log(`RESULT: ${stdout}`);
//             }

//             seedRunPhp.kill();
//             return;
//           });


//         }
//         rl.close();
//       }

//       else {
//         console.log('============================ \n Your answer must be true or false ');
//       }

//     });
//   });
// });

// fs.readFile(PATH_APP_CONFIG, 'utf-8', (err, file) => {
//   if (err) throw err;

//   let baseUrl = file.match(/\$config\['base_url'\].*/gm);

//   file = file.replace(baseUrl[0], `$config['base_url'] = 'https://${CURENT_DERICTORY}.osora.ru/';`);

//   fs.writeFile(PATH_DB_CONFIG, file, 'utf-8', (err) => {
//     console.log(file)
//     if (err) throw err;
//   });

// })