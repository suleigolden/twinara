import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';

export function configureBodyParser(app: NestExpressApplication) {
  const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (
      !req.headers['stripe-signature'] &&
      !req.headers['x-eukapay-signature']
    ) {
      return;
    }

    if (buffer && buffer.length) {
      req.rawBody = buffer.toString(encoding || 'utf8');
    }
  };

  app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
  app.use(bodyParser.json({ verify: rawBodyBuffer }));
}
