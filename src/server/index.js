const express = require('express');
const cors = require('cors');
const path = require('path');
const azureStorage = require('azure-storage');

const app = express()
app.use(cors())

const tempDir = path.join(__dirname,'/../../temp');
app.use('/documents',express.static(tempDir))

const port = 4000

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

const azureStorageConfig = {
    accountName: STORAGE_ACCOUNT_NAME,
    accountKey: ACCOUNT_ACCESS_KEY,
}; 
function getFile(blobName){
    const downloadFilePath = path.join(tempDir,blobName);
    return new Promise((resolve, reject) => {
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey); 
        blobService.getBlobToLocalFile("demo", blobName, downloadFilePath, function(error, serverBlob) {
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

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))