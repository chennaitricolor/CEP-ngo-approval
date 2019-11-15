This is the NGO Approval module for the CEP Platform.
A standalone web app that contains the react application for approving the organisation requests that are raised from the CEP Platform.

The project has one react layer and one server layer

1. The server layer is composed of express which interacts with CEP's Hasura upstream and Azure Storage.
2. And react application built with ANT Design.
3. A cron job which periodically clears the temperorary blobs.

Inorder to run the application in local you would need env variables which you can acquire by raising a request.
