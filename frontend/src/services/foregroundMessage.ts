import { getMessaging, onMessage } from 'firebase/messaging'
import { app } from '@/services/initFirebase'

const messaging = getMessaging(app)

onMessage(messaging, payload => {
    const notificationTitle =
      payload && payload.notification && payload.notification.title
    const notificationOptions = {
      body: payload && payload.notification && payload.notification.body,
    }
  
    if (
      Notification.permission === 'granted' &&
      notificationTitle &&
      notificationOptions.body
    ) {
      new Notification(notificationTitle, notificationOptions)
    }
  })