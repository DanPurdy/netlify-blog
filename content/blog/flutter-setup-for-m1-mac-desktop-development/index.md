---
path: flutter-setup-m1-mac-desktop-development
date: 2022-01-26T22:36:11.668Z
title: Flutter Setup for M1 Mac Desktop Development
description: Getting Flutter setup and running for MacOS desktop app development
  on the M1 - Docs without the guesses
---
I recently came back to a desktop app I'd been working on for macOs with the latest version of Flutter, since i last worked on it I've been lucky enough to get an M1 mac as an upgrade to my 2012 Intel based Macbook Pro I was using before. The setup process isn't too much different but there were a few things i ran into so I'm going to go through how i setup flutter from start to finish below for those of you who are coming back to Flutter on an M1 or just for those of you who're new to Flutter.

To start with most of the instructions to get up and running with Flutter are the same as those on the [official installation guide](https://docs.flutter.dev/get-started/install/macos) but with a few changes. Lets start from the beginning.

\## 1. Download and install Flutter

First off you'll want to download the latest release of Flutter from the top of their [installation guide page](https://docs.flutter.dev/get-started/install/macos). Make a note of the location you download it to - below we'll assume you saved it to your download folder.

Move into the directory where you're going to keep the Flutter source code in my case this is \`~/workspace/flutter/\` but it can be anywhere you like. At the time of writing Flutter 2.8.1 was the latest release, adjust the below accordingly however you'd like to

```
cd ~/workspace
unzip ~/Downloads/flutter_macos_2.8.1-stable.zip

```

Now you'll want to add Flutter to your PATH. ZSH is now the default shell in macOS but if you've switched shells then you'll more than likely know how to adjust the below to set the PATH in your current shell.

```
vi ~/.zshrc

// Move to the bottom of your zshrc file and add the following
 export PATH="$PATH:`pwd`/flutter/bin"
 
 // exit and save vim esc then shift + zz
 // then lets get your PATH updated in your current session
 source ~/.zshrc
 
```

\## 2. Run Flutter Doctor

Flutter should now be setup if you run:



```
which flutter

// output - you should see something like
~/workspace/flutter/bin/flutter
```

you should see the path to the flutter binaries as above. Now lets run flutter doctor to check our install

```
flutter doctor
```