# OSC-Proximity-Chat-App
We're making an app that allows you to talk to people within a set radius around you, anonymously. You could use this to easily chat with people at very populated places, like a library or dining hall on campus.

[Drop ideas into the planning doc](https://docs.google.com/document/d/1fnZhzdzapjkcn7T2G9LytV6WGVBb7rkJRJlz3hdv6NY/edit?usp=sharing) (Google Docs)

[Design plans](https://www.figma.com/file/2mvddKeA4XMODdCidYkDid/Proximity-Chat-App) (Figma)

## Developer instructions
First, make sure you have the latest stable version of Node.js installed on you system.

Then, fork this repository and run `git clone <url of forked repo>`.

#### Linux
Install [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating) (Github) and follow the installation instructions. Check to see if your distro's package manager carries nvm before this, though.

After `nvm` is installed run `nvm install node` and then `nvm use node`.

#### Windows
Install Linux immediately

### Client
Install the ExpoGo app from the Google Play Store or App Store on your phone.

`cd` into `client` and install the dependencies: `npm install`.

Use `npm start` to start the program and scan the QR code using the ExpoGo App (Android) or the Camera App (iOS).

### Server
`cd` into `server` and install the dependencies: `npm install`.

While working, run `npx tsc` to compile the typescript code into the `build` directory as Javascript. Or run `npx tsc -w` in a seperate terminal to recompile on file changes.

Start the server: `npm start`.

## Contributing
Please see `CONTRIBUTING.md`.
