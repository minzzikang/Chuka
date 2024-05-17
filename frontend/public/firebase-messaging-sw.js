importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

// install event
self.addEventListener("install", (e) => {
});

// activate event
self.addEventListener("activate", function (e) {
  // e.waitUntil(self.clients.claim())
  console.log("fcm service worker가 실행되었습니다.");
});

// fetch event
self.addEventListener("fetch", (e) => {
  const type = e.data.json().data.type;
  console.log(type);
  console.log("e.data.json() ==>>",e.data.json());
  console.log("e.data.json().data ==>>",e.data.json().data);
});

const EVENT_CREATE = "EVENT_CREATE";
const FUNDING_COMPLETE = "FUNDING_COMPLETE";
const EVENT_OPEN = "EVENT_OPEN";
const FUNDING_APPROVED = "FUNDING_APPROVED";
const FUNDING_DISAPPROVED = "FUNDING_DISAPPROVED";
const ROLLING_CREATE = "ROLLING_CREATE";

let isEvent = false;
let thisPageUri = null;
let thisEventId = null;
let thisFundingId = null;


self.addEventListener("push", function (e) {
  if (!e.data.json()) return;
  
  const type = e.data.json().data.type;

  if(type === EVENT_OPEN || type ===  EVENT_CREATE || type === ROLLING_CREATE){
    isEvent = true;
    thisEventId = e.data.json().data.eventId
    thisPageUri = e.data.json().data.pageUri
    
  } else {
    thisFundingId = e.data.json().data.fundingId

  }

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

});

self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  if(isEvent === true){
      e.waitUntil(clients.openWindow(`/celebrate/rolling/${thisEventId}/${thisPageUri}`));
  }else{
    e.waitUntil(clients.openWindow(`/celebrate/funding/${thisFundingId}`)); 
  }

});
