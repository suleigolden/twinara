import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { ConfigService } from '@nestjs/config';

export const initializeFirebase = (configService?: ConfigService) => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: '',
        privateKey:'',
          clientEmail:
          '',
      }),
      storageBucket: '',
    });
  }

  return getStorage();
};

export const firebaseStorage = initializeFirebase();
