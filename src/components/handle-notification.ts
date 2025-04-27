type PredictionData = {
  payload: string;
  prediction: Array<{
    No: number;
    Yes: number;
  }>;
};

export const showPredictionNotification = async (data: PredictionData) => {
  if ("Notification" in window) {
    if (navigator.serviceWorker && Notification.permission === "granted") {
      const registration = await navigator.serviceWorker.ready;

      const predictionMessage = `
        Prediction: ${data.payload}
        ${
          data.prediction[0].Yes > data.prediction[0].No
            ? `Yes: ${data.prediction[0].Yes}%`
            : `No: ${data.prediction[0].No}%`
        }
      `;

      // Use the Service Worker to show the notification
      registration.showNotification("Prediction Result", {
        body: predictionMessage,
        icon: "/favicon.ico", // Using favicon as the notification icon
      });
    } else if (Notification.permission === "granted") {
      // Fallback to regular notification for local or non-service-worker environments
      const predictionMessage = `
        Prediction: ${data.payload}
        ${
          data.prediction[0].Yes > data.prediction[0].No
            ? `Yes: ${data.prediction[0].Yes}%`
            : `No: ${data.prediction[0].No}%`
        }
      `;

      new Notification("Prediction Result", {
        body: predictionMessage,
        icon: "/favicon.ico",
      });
    }
  } else {
    console.warn("Notification API not supported in this browser");
  }
};
