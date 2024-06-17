const config = {
  development: {
    name: 'Dev - Talk & Torque',
    packageName: 'com.kashpitan.talkandtorque.dev',
  },
  preview: {
    name: 'UAT - Talk & Torque',
    packageName: 'com.kashpitan.talkandtorque.uat',
    googleServicesFile: './src/environments/uat/google-services.json',
  },
  production: {
    name: 'Talk & Torque',
    packageName: 'com.kashpitan.talkandtorque',
    googleServicesFile: './src/environments/development/google-services.json',
  },
};

export default {
  name: config[process.env.APP_VARIANT].name,
  slug: 'talkTorque',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/27490e4d-89dd-4c32-b93e-cb439cd6a4a8',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: config[process.env.APP_VARIANT].packageName,
  },
  android: {
    googleServicesFile: config[process.env.APP_VARIANT].googleServicesFile,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: config[process.env.APP_VARIANT].packageName,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: '27490e4d-89dd-4c32-b93e-cb439cd6a4a8',
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};
