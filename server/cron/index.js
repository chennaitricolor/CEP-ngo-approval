const fs = require('fs');
const cron = require('node-cron');
const path = require('path');

const TEMP_DIR = path.join(__dirname,'/../temp');
const DELETE_FILES_EVERY_10_MINS = '0 */10 * * * *';

//CRON to remove the downloaded files periodically
var removeTempFiles = cron.schedule(DELETE_FILES_EVERY_10_MINS, () =>  {
    fs.readdir(TEMP_DIR, (err, files) => {
        if (err) throw err;
        console.log("deleting files");
        for (const file of files) {
          fs.unlink(path.join(TEMP_DIR, file), err => {
            if (err) throw err;
          });
        }
      });
  });

console.log("Cron Started");
removeTempFiles.start();