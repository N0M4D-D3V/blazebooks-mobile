# Blazebooks

## Generate Android APK with no Android Studio or Ionic

Note that install sdkmanager could help with the process.

```bash
$ npx capacitor add android
$ npx capacitor copy android && cd android && ./gradlew assembleDebug && cd ..
```

Then your apk will be at android/app/build/outputs/apk/debug/app-debug.apk

If you want to run on device directly from command line:

```bash
$ npx capacitor copy android && cd android && ./gradlew assembleDebug && ./gradlew installDebug && cd ..
```

For production use this:

```bash
$ cd android && ./gradlew assembleRelease && cd app/build/outputs/apk/release &&
jarsigner -keystore {YOUR_KEYSTORE_PATH} -storepass {YOUR_KEYSTORE_PASS} app-release-unsigned.apk Y{OUR_KEYSTORE_ALIAS} &&
zipalign 4 app-release-unsigned.apk app-release.apk
```

[Original post here](https://forum.ionicframework.com/t/how-to-build-an-android-apk-file-without-using-android-studio-in-a-capacitor-project/177814)
