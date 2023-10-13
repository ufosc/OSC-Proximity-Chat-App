# OSC-Proximity-Chat-App
[Drop ideas into the planning doc](https://docs.google.com/document/d/1fnZhzdzapjkcn7T2G9LytV6WGVBb7rkJRJlz3hdv6NY/edit?usp=sharing) (Google Docs)

[Design plans](https://www.figma.com/file/2mvddKeA4XMODdCidYkDid/Proximity-Chat-App) (Figma)

## Developer instructions

Install the ExpoGo app from the Google Play Store or App Store on your phone

Fork this repository and run `git clone <url of forked repo>` on your system.

### Client
Make sure you have the latest stable version of Node.js installed on you system
#### Linux
Install `nvm` with `pacman -S nvm` for Arch linux or by following [this tutorial](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/) for Debian/Ubuntu

After `nvm` is installed run `nvm install node` and then `nvm use node`

Use `cd` to enter the client directory and install the dependencies using `npm install`

Use `npm start` to start the program and scan the QR code using the ExpoGo App (Android) or the Camera App (iOS)

#### Windows
Install Linux immediately


### Server
Compile typescript code: `npx tsc`
Start the server: `npm start`

`cd` into the client and install the dependencies in `client` and `server`: run `npm install`

## Short-term TO-DO
Front-end
* Work on what is not checked in DesignChecklist.md

Back-end
* Set up app communication with back-end server
* Set up Firebase project and database schema
