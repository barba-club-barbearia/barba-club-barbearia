self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || "/icon.png", // Ícone da notificação
    });
  } else {
    console.error("Push event sem dados!");
  }
});

// Listener para ações na notificação
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(targetUrl));
});
