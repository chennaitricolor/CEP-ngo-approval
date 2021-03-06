const express = require('express');
const cors = require('cors');
const path = require('path');
const azureStorage = require('azure-storage');
const orgainsation = require('./hasuraClient');

const app = express();
const PORT = process.env.PORT || 4000;
const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
const AZURE_STORAGE_CONTAINER = process.env.AZURE_STORAGE_CONTAINER;
const azureStorageConfig = {
    accountName: STORAGE_ACCOUNT_NAME,
    accountKey: ACCOUNT_ACCESS_KEY,
}; 
app.use(cors());

const TEMP_DIR = path.join(__dirname,'/temp');
app.use('/documents',express.static(TEMP_DIR));
app.use('/organisation', orgainsation);


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
    app.get('/', (req, res) => res.send('Hello World!'));
} else {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

}

function getFile(blobName){
    const downloadFilePath = path.join(TEMP_DIR,blobName);
    return new Promise((resolve, reject) => {
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey); 
        blobService.getBlobToLocalFile(AZURE_STORAGE_CONTAINER, blobName, downloadFilePath, function(error, serverBlob) {
            if (error) {
                console.log("^^^^",error)
                resolve(error);
            } else {
                resolve(blobName);
            }
        });
    });
}

app.get('/downloadFile/:file',async (req,res)=> { 
    const fileName = await getFile(req.params.file);
    res.send(fileName);
});


app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}!`));