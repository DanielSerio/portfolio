export async function getCurrentCoordinates() {
  return await new Promise<{ lat: number; lng: number; }>((resolve, reject) => {
    const onSuccess: PositionCallback = (postion: GeolocationPosition) => {
      if (postion.coords) {
        resolve({
          lat: postion.coords.latitude,
          lng: postion.coords.longitude
        });
      }
    };

    const onError: PositionErrorCallback = (err: GeolocationPositionError) => {
      console.error('GeolocationPositionError', err);
      reject(err as GeolocationPositionError);
    };

    window.navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });
}