import { useEffect } from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export const BluetoothPermissionExample = () => {
  useEffect(() => {
    // Check if Bluetooth permissions are already granted
    check(Platform.OS === 'ios' ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL : PERMISSIONS.ANDROID.BLUETOOTH)
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          console.log('Bluetooth permissions are already granted');
        } else {
          // Request Bluetooth permissions
          request(Platform.OS === 'ios' ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL : PERMISSIONS.ANDROID.BLUETOOTH)
            .then((newResult) => {
              if (newResult === RESULTS.GRANTED) {
                console.log('Bluetooth permissions granted');
              } else {
                console.log('Bluetooth permissions denied');
              }
            })
            .catch((error) => {
              console.error('Error requesting Bluetooth permissions:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error checking Bluetooth permissions:', error);
      });
  }, []);

  // ... rest of your component code ...
};
