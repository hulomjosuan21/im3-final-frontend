type PredictionData = {
  payload: string;
  prediction: Array<{
    No: number;
    Yes: number;
  }>;
};

export const showPredictionNotification = async (data: PredictionData) => {
  const faviconUrl = "/favicon.ico";
  const response = await fetch(faviconUrl);
  const blob = await response.blob();
  const iconUrl = URL.createObjectURL(blob);

  if ("Notification" in window && Notification.permission === "granted") {
    if (data?.payload && data.prediction) {
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
        icon: iconUrl,
      });

      URL.revokeObjectURL(iconUrl);
    }
  } else if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // Show the notificatin after permission is granted
        if (data?.payload && data.prediction) {
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
            icon: iconUrl,
          });

          URL.revokeObjectURL(iconUrl);
        }
      }
    });
  }
};
