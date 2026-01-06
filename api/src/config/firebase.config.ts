import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { ConfigService } from '@nestjs/config';

export const initializeFirebase = (configService?: ConfigService) => {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: 'imageuploads-33589',
        privateKey:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkKSJId4Dv/oSS\n3iTJ2lCqOib/+sdga/khTI5EVsizZW+J89St+O8eV4BH+1jOCTYIEGH36E4TKReQ\nPQtmFAlYgDjKa//F9HyYKoGo9e7NLiL5QsBxXKp+TLAfiXKFoEjJYVWOjkaaAXoQ\nVuuRD8BsWxYju3kHItzbcqROLHUo0GtKOoYYyeQF1DoTa6WVKO3mWjz1AgsTdWoj\nnDtiZVrqvP8cJ1MEe/oyLr3xMTmyfE5t83gHQGWD7hKNvFQ3UGuhJOjlc6Qdh+9I\n9DLsSBv2GovCWMl2y6psFR4TucosfoidoyFaYRkL9cUtNjOtYchOquF3IXqrU/hU\nB7eF8ItvAgMBAAECggEAAWQagZlcTaxPHJzRRvyYmQ4BF+4yE6PBQAJRZPbZ9dsy\n2he81583t37E/Cx/EM/h1f5S4NzmZyHUAfQ3zSz3n05cLNWZceijyE5OkaCeiL05\nV/oJfhcWQsJiQ6zQfEgNayzDTX/wd+Gcp9gfYDf383MaJEIJwSu5ygpApiuY7+Lr\naypi+gURrjUrQuDrSwWh180fLfO63FoNsh33/OpLAgw/0e+dg//FQ0OZ2EoQTwnz\nBlzlMPJcsW1GNUbeJCxap0xYfeuwMPzfZBt57flg5w+hl8lWm2NbimLPBtafWKLT\niQtw2i5zJDR89UFfofEmfAkp351HLfDU4iHSyWFhYQKBgQDYLRoy/wX+t07zH2wH\nJJHviWw/b8ec0Ql1Kka6pOk774gGPEe53ejVJ9YoGb8W/xhfdvmGt/ZLbRfHdNs+\nWNizjoGwSxIUK7V4wHCx4FNeg+i/1JdF2kYwJ0yQ0nowmxXKEPvBgSoOcjUwcE8+\nkMOQ/LIyhpy7tGjzSEnHIHEeWQKBgQDCZvk6ooC67BfOxJZvclCGdf4iNiJkYzDt\n07AdX+3dq/PhbrtHlJ49w5IofDaL6Vw4lA4fyc9Wuqe/oDhTd+aWvCBl9s1hiNeD\nS+DpyjNWSk3E0kg/W7FN0zhheGvE717UvHQZVp3/2Yn0vavZdf7TghN2Vz+KKGRW\n9tNV322PBwKBgHsVuxwcLoqoTrCJTJYIkXtE0LiR6aL1NqBakOkGqrHwoY+DVQeU\nPVTYmMw+VJpAZt08PbkiF388v1RWydqG9ePOmTMKm2GWvX3ifIgbBP0EuEo5PmSM\ncnhKeALhhKcWNmLWJrI32/1bs8M/vy8Nd/yelMvF74nEoBkdKLzTUPUJAoGBAKcQ\nmYTDXH/HH5qpJWM3SW6UfkbmYN4GxGjOcF5+L0w+VwNYBwg391m69aNnQ/UvIfrZ\ned3lsBKnrDupNF6+/uJxYCJgXBZC5HrIPcyM4Vt51aWc1Uvlv9TS/XP+ahc/Yy7N\nmbSg1H2odL9oNQRYPBuGgLVFu6w+lCSMUAhPT7cHAoGATRyrEWN+0+s/JWoOaICI\nusIGG1v8uMIq5b1dCuLRVCe9HyM1ovwDspvjOanpGUYwARHNdx/oyGwgYEUAhc5l\nTSaGwx1wmf8NSztnn7ZIpDy0W1uOokPB+ZFFfRNCZOhlMAUYvFtR7dwSyo1zvB0t\nXz9I/4UzjSLj8plDtV6xt0A=\n-----END PRIVATE KEY-----\n',
        clientEmail:
          'firebase-adminsdk-68baf@imageuploads-33589.iam.gserviceaccount.com',
      }),
      storageBucket: 'imageuploads-33589.appspot.com',
    });
  }

  return getStorage();
};

export const firebaseStorage = initializeFirebase();
