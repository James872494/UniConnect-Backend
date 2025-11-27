// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';

// dotenv.config();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     credentials: true,
//   });

//   const port = process.env.PORT || 5000;
//   await app.listen(port);
//   console.log(`🚀 Server running on http://localhost:${port}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';  // ✅ Required for static files
import { join } from 'path';  // ✅ Required for paths
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  // ✅ Cast to NestExpressApplication for staticAssets
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // ✅ CORS (your existing config)
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // ✅ SERVE STATIC FILES - THIS FIXES IMAGES
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📁 Images available at http://localhost:${port}/uploads/events/`);
}
bootstrap();
