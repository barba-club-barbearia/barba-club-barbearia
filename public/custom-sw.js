// custom-sw.js

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Nova Notificação", {
    body: data.body || "Você tem uma nova mensagem!",
    icon: data.icon || "/icon.png", // Ícone da notificação
    tag: data.tag || "general", // Tag para evitar notificações duplicadas
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(urlToOpen));
});
