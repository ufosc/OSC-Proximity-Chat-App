#! /bin/bash

# Rest API Tests
# These are written for Bash. If the file does not run and you are in a linux environment, "sudo chmod +x <FILENAME> should make it executable."

# Create User document
curl --data \
"displayName=USERNAME&\
userId=USERID&\
avatarUrl=AVATARURL&\
lat=100&\
lon=100&\
geohash=GEOHASH" \
localhost:3001/users
echo "" # Creates a new line
sleep 1

curl --request "PUT" \
localhost:3001/users?userId=USERID\&toggleConnection=true
echo ""
sleep 1

curl --request "PUT" \
localhost:3001/users?userId=USERID\&lat=88\&lon=88
echo ""
sleep 1

curl --request "DELETE" \
localhost:3001/users?userId=USERID
echo ""
