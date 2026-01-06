import { NestExpressApplication } from '@nestjs/platform-express';

export function configureCors(app: NestExpressApplication) {
  const origins = [
    /checkout\.stripe\.com/,
    /stripe\.com/,
    /dashboard\.stripe\.com/,
    /hooks\.stripe\.com/,
    /localhost:\d+/, // ✅ Allow localhost in all environments
     // VAPI.AI domains
     /vapi\.ai$/,
     /.*\.vapi\.ai$/,
     /api\.vapi\.ai$/,
     /dashboard\.vapi\.ai$/,
     // Allow all origins for VAPI webhook (you can restrict this later)
  ];

  app.enableCors({
    // origin: (origin, callback) => {
    //   if (!origin || origins.some((o) => o.test(origin))) {
    //     callback(null, true);
    //   } else {
    //     console.log('Not allowed by CORS: ', origin);
    //     callback(new Error(`Not allowed by CORS: ${origin}`));
    //   }
    // },
    credentials: true, // ✅ Necessary for sending cookies
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'Cookie',
      'apikey',
      'ApiKey',
    ],
    exposedHeaders: ['Content-Range', 'X-Content-Range', 'Set-Cookie'],
    maxAge: 3600,
    preflightContinue: false, // ✅ Ensures OPTIONS requests are handled properly
  });

  // ✅ Ensure OPTIONS requests always succeed (fixes some CORS issues)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.status(204).send();
    } else {
      next();
    }
  });
}
