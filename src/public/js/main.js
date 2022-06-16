const PUBLIC_VAPID_KEY = 'BN-WajE1Zn4EUKuFHL7ZD64B0vtPIcT0m4mZTtrsjQOVVI3RXhmgQpS_mrFCew1BIYQ9hqv9Xn-F62wzirfgT-k';

async function subscription() {
   console.log("Register a service worker");
   this.onpush = function(event) {
    console.log(event.data);
    // From here we can write the data to IndexedDB, send it to any open
    // windows, display a notification, etc.
  }
  
  navigator.serviceWorker.register('./worker.js');
  
  // Use serviceWorker.ready to ensure that you can subscribe for push
  navigator.serviceWorker.ready.then(
    function(serviceWorkerRegistration) {
      var options = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
      };
      serviceWorkerRegistration.pushManager.subscribe(options).then(
        function(pushSubscription) {
          console.log(pushSubscription.endpoint);
          // The push subscription details needed by the application
          // server are now available, and can be sent to it using,
          // for example, an XMLHttpRequest.
        }, function(error) {
          // During development it often helps to log errors to the
          // console. In a production environment it might make sense to
          // also report information about errors back to the
          // application server.
          console.log(error);
        }
      );
    });
  
   //console.log("New Service Worker");

}
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
subscription();
