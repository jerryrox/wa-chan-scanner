# wa-chan-scanner

A simple barcode / QRCode scanner app using Expo. The main purpose of this app is to study how to create Expo apps using Expo XDE and analyze the pros and cons of using this technology.

## Introduction
Barcode scanner apps in the market are great, but they are too boring. So why don't we add some "2D waifuu salt" for otakus?
  This app was quickly built with Expo to meet such demands with WA2000 chan.
  
  As mentioned above, this application is mainly for study purposes and therefore, some great features which other scanner apps have may not exist in this project. Also, my codes will look dirty and contain very few comment to complete development in a short amount of time.

## Setup
Environment:
* VSCode
* Expo XDE
  
Test devices:
* Android) Samsung Galaxy Tab A
* iOS) Iphone 6 16GB

## Features
### Home View
Displays background image
* Changable in Shop View.
  
Displays touchable character.
* If pressed, a random audio of character will be played.
* Changable in Shop View.

### Scan View
Displays a Barcode scanner view.
* User can scan any type of barcodes supported by Expo.
  
Displays a cancel button.
* Cancels scanning and navigates to Result View.

### Result View
On Success
* Displays the amount of points earned from scan results.
* Displays the barcode type.
* Displays the barcode data.
* Displays the "Open URI" button if the system can open the barcode data.
* Displays the "To Home" button.
  
On Fail
* Displays the "failed" text.

### Shop View
Displays two tabs on top.
* Show character skins list.
* Show backgrounds list.
  
Displays shop items.
* User can switch currently equipped skin / background or purchase them with scan points.

## Conclusion
Overall, my development experience with Expo were generally neutral to positive. Although it provided a great platform to quickly build my application, there were some significant aspects that were uncomfortable during the development and deploy phase.
  
1. App freezes frequently during splash screen.
  Specifically, the Expo environment displays "Building javascript bundle stuck" and nothing else happens on the testing device.
  I've encountered this issue since the initial testing of my app. It was okay on some unknown cases but this happened pretty much most of the time. I also Googled for such issue and it appeared to be a known bug in Expo. Even up to now (16 June, 2018), there is no clear solution or at least a method on debugging this error.
  One solution that worked, however, was simply to test the project on another device. It seemed that the new device was able to catch and display any JS errors that were silently crawling in the project. If you don't have another device to work with, rebooting the system would also do the trick. In reality though, I believe such solution is a sort of "hack" and it's too time-inefficient to apply on actual industry projects.
  I'd personally vote this as the most critical bug in Expo and unless the Expo team takes appropriate actions, I would definitely reconsider using their technology in other projects, even for prototypes.
  
2. Hot reloading doesn't always work.
  Hot reloading is one of the core benefits of developing React apps but it doesn't work properly with Expo. Just like above, it MAY work sometimes, under unknown conditions but it didn't work for most of the time. Furthermore, I ended up using only Live Reloading for this project because it didn't even work, and it wasn't a very good experience.
  
3. APK installation takes a long time.
  At the end of the development, I tested the application on my Android device from an APK file. In the end, it was working fine without errors but the installation took over a minute to finish. Other apps built from platforms such as Android Studio or even Unity doesn't take this long to install with the same APK size. Some devices wouldn't even install and infinitely display the "installing" popup.
  
4. Limitation of using Native libraries.
  By default, you can't use Native libraries in Expo environment because of its design. In detaill, your app (JavaScript code) acts as the content of the actual native application (built in cloud) and this design allows updating the client apps without rebuilding your project. It seems it's possible for a developer to "eject" the project for full control over the app. In my opinion though, this is something which developers should bear with while using Expo, since it's a framework designed to work that way.

## Copyrights
I do NOT own any of the assets such as the background img, character img, and the audio files. You may use some ideas from this project but never include the assets when developing for commercial purposes.
