import { precacheAndRoute } from 'workbox-precaching';

self.__WB_DISABLE_DEV_LOGS = true

// manifest import will be autogenerated by webpack
precacheAndRoute(self.__WB_MANIFEST || []);

