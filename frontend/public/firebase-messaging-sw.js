importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

// install event
self.addEventListener("install", (e) => {
  // console.log("[Service Worker] installed");
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

const EVENT_CREATE = "EVENT_CREATE";
const FUNDING_COMPLETE = "FUNDING_COMPLETE";
const EVENT_OPEN = "EVENT_OPEN";
const FUNDING_APPROVED = "FUNDING_APPROVED";
const FUNDING_DISAPPROVED = "FUNDING_DISAPPROVED";

let thisType = null;
let thisPageUri = null;
let thisEventId = null;
let thisFundingId = null;


self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  
  console.log("[TEST] : ", e.data.json().data);
  console.log("[TYPE] : ", e.data.json().data.type);
  const type = e.data.json().data.type;
  if(type === EVENT_OPEN){
    console.log("============================")
    console.log("ㅇㅇ 이거 맞음.")
    console.log("============================")

  }

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("resultData: ", { resultData });

  self.registration.showNotification(notificationTitle, notificationOptions);
  // const notification = e.data.json().notification;

  // const notificationTitle = notification.title;
  // const notificationOptions = {
  //   body: notification.body,
  //   icon: notification.icon,
  // };

  // if (notification && notificationTitle && notificationOptions.body) {
  //   self.registration.showNotification(notificationTitle, notificationOptions);
  // }
});

self.addEventListener("notificationclick", function (e) {
  console.log(resultData);
  e.notification.close();
  e.waitUntil(clients.openWindow(`/alarm`));
});
