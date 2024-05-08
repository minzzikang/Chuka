importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

// install event
self.addEventListener("install", (e) => {
  console.log("[Service Worker] installed");
});

// activate event
self.addEventListener("activate", function (e) {
  // e.waitUntil(self.clients.claim())
  console.log("fcm service worker가 실행되었습니다.");
});

// fetch event
self.addEventListener("fetch", (e) => {
  // console.log('[Service Worker] fetched resource ' + e.request.url);
});

//
self.addEventListener("push", function (e) {
  const notification = e.data.json().notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.icon,
  };

  if (notification && notificationTitle && notificationOptions.body) {
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(clients.openWindow("/alarm"));
});
