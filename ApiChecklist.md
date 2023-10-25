## Database schema

Cloud Firestore, a Firebase product, is a NoSQL (Not-Only-SQL) database. Data is stored in documents, which are kept inside of collections. A reference can be made to a document on our server's end to manipulate it. Every document is identifiable by a value (a string), though we have not yet finalized how we will be generating this in each of our collections.

To get a better understanding, please skim through Firestore's documentation [here](https://firebase.google.com/docs/firestore/).

### Messages collection

Identifier:

- msgId

Document attributes:

- userId (string)
- msgContent (string)
- specificLat (string)
- specificLon (string)
- broadLat (string)
- broadLon (string)
- timeCreated (string)

Description:

- Every message created will be related to the user that created it and store its content.
- Two geolocation identifiers are stored, which are called Specific and Broad. We want to be able to easily query Firestore for potential nearby users for efficency reasons, so broad coordinates (with say, only 2 decimal points) are kept for this reason. Specific coordinates will be used to determine users within a set radius.
- timeCreated:

### Users collection

Identifier:

- userId

Document attributes

- displayName
- avatarUrl

## Contributing

Code for routes is stored in `/server/src/index.ts`

Functions for routes, like `createMessage` or `getMessage` are stored in `/server/src/actions`

Please reference one of these when creating a new _action_.

## Routes

### Messages

- [x] GET /messages

* return the 100 newest messages from Firestore

- [x] GET /messages?msgId=\<msgId\>

* return a message document with a matching msgId

- [x] GET /messages?broadLat=\<broadLat\>&broadLon=\<broadLon\>

* return all messages with matching broadLat and broadLon attributes

- [x] GET /messages?broadLat=\<broadLat\>&broadLon=\<broadLon\>&secondsSinceCreation=\<seconds since creation\>

* return all messages with matching broadLat and broadLon attributes, and
* has a timeCreated attribute that is with the bounds of secondsSinceCreation

- [x] POST /messages/new

* add a Message document to the Messages collection in Firestore

- [ ] DELETE /messages?msgId=\<msgId\>

* Delete a message document with the corresponding msgId

### Users

- [ ] GET /users?userId=\<userId\>

* return a user document with a matching userId

- [ ] POST /users

* add a user docment to the Users collection in Firestore

- [ ] DELETE /users?userId=\<userId\>

* Delete a user document with the corresponding userId
