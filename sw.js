// sw.js - Background Push Event Listener
self.addEventListener('push', (event) => {
  let payload = { title: 'LifeHub Reminder', body: 'You have a pending task due!' };
  
  if (event.data) {
    try {
      payload = event.data.json();
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const options = {
    body: payload.body,
    icon: 'data:image/svg+xml,%3Csvg xmlns="..."', // Paste your icon here
    badge: 'data:image/svg+xml...',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now() }
  };

  // Crucial for iOS: You must wrap the notification creation in event.waitUntil
  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});
