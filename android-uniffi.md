# Android Uniffi

Step 1 
generate shit

Copy bindings
```bash
cp -rv node-uniffi/app/* ~/AndroidStudioProjects/LuminaDemo/app
```

Step 2
Add imports to build.gradle.kt
```
    // Uniffi
    implementation("net.java.dev.jna:jna:5.7.0@aar")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
```