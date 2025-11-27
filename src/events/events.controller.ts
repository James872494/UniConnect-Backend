// import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
// import { EventsService } from './events.service';
// import { CreateEventDto } from './dto/create-event.dto';
// import { Event } from './schemas/event.schema';

// @Controller('events')
// export class EventsController {
//   constructor(private readonly eventsService: EventsService) {}

//   @Post('create')
//   create(@Body() createEventDto: CreateEventDto): Promise<Event> {
//     return this.eventsService.create(createEventDto);
//   }

//   @Get()
//   findAll(): Promise<Event[]> {
//     return this.eventsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<Event> {
//     return this.eventsService.findOne(id);
//   }

//   @Patch(':id/rsvp')
//   rsvp(
//     @Param('id') id: string,
//     @Body('userId') userId: string,
//     @Body('attending') attending: boolean,
//   ): Promise<Event> {
//     return this.eventsService.rsvp(id, userId, attending);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.eventsService.remove(id);
//   }
// }

// import { 
//   Controller, Get, Post, Body, Param, Delete, Patch, 
//   UseInterceptors, UploadedFile, BadRequestException, 
//   ParseFilePipe, MaxFileSizeValidator, FileTypeValidator 
// } from '@nestjs/common';
// import { EventsService } from './events.service';
// import { CreateEventDto } from './dto/create-event.dto';
// import { Event } from './schemas/event.schema';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

// @Controller('events')
// export class EventsController {
//   constructor(private readonly eventsService: EventsService) {}

//   @Post('create')
//   @UseInterceptors(FileInterceptor('image', {
//     storage: diskStorage({
//       destination: './uploads/events',
//       filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//       }
//     }),
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//       } else {
//         cb(new Error('Only image files are allowed!'), false);
//       }
//     },
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   }))
//   async create(
//     @Body() createEventDto: CreateEventDto,        // ✅ REQUIRED first
//     @UploadedFile() file?: Express.Multer.File     // ✅ OPTIONAL second
//   ): Promise<Event> {
//     const eventData = {
//       ...createEventDto,
//       imageUrl: file ? `/uploads/events/${file.filename}` : undefined,
//     };
    
//     console.log('Creating event:', eventData); // ✅ Debug
//     return this.eventsService.create(eventData);
//   }

//   @Get()
//   findAll(): Promise<Event[]> {
//     return this.eventsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<Event> {
//     return this.eventsService.findOne(id);
//   }

//   @Patch(':id/rsvp')
//   rsvp(
//     @Param('id') id: string,
//     @Body('userId') userId: string,
//     @Body('attending') attending: boolean,
//   ): Promise<Event> {
//     return this.eventsService.rsvp(id, userId, attending);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.eventsService.remove(id);
//   }
// }

// import { 
//   Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile, 
//   BadRequestException, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator 
// } from '@nestjs/common';
// import { EventsService } from './events.service';
// import { CreateEventDto } from './dto/create-event.dto';
// import { Event } from './schemas/event.schema';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { NotFoundException, ForbiddenException } from '@nestjs/common';

// @Controller('events')
// export class EventsController {
//   constructor(private readonly eventsService: EventsService) {}

//   @Post('create')
//   @UseInterceptors(FileInterceptor('image', {
//     storage: diskStorage({
//       destination: './uploads/events',
//       filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//       }
//     }),
//     fileFilter: (req, file, cb) => {
//       if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//       } else {
//         cb(new Error('Only image files are allowed!'), false);
//       }
//     },
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   }))
//   async create(
//     @Body() createEventDto: CreateEventDto,
//     @UploadedFile() file?: Express.Multer.File,
//   ): Promise<Event> {
//     const eventData = {
//       ...createEventDto,
//       imageUrl: file ? `/uploads/events/${file.filename}` : undefined,
//     };
    
//     console.log('Creating event:', eventData);
//     return this.eventsService.create(eventData);
//   }

//   @Get()
//   findAll(): Promise<Event[]> {
//     return this.eventsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<Event> {
//     return this.eventsService.findOne(id);
//   }

//   @Patch(':id/rsvp')
//   async rsvp(
//     @Param('id') id: string,
//     @Body('userId') userId: string,
//     @Body('attending') attending: boolean,
//   ): Promise<Event> {
//     return this.eventsService.toggleRsvp(id, userId, attending);
//   }

//   @Delete(':id')
//   async deleteEvent(
//     @Param('id') id: string,
//     @Body('userId') userId: string,
//   ): Promise<{ message: string }> {
//     return this.eventsService.deleteEvent(id, userId);
//   }
// }

import { Controller, Get, Post, Body, Param, Delete, Patch, UseInterceptors, UploadedFile, NotFoundException, ForbiddenException } from '@nestjs/common';
import { EventsService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/events',
      filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async create(@Body() createEventDto: any, @UploadedFile() file?: Express.Multer.File) {
    const eventData = {
      ...createEventDto,
      imageUrl: file ? `/uploads/events/${file.filename}` : undefined,
    };
    return this.eventsService.create(eventData);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Patch(':id/rsvp')
  async rsvp(@Param('id') id: string, @Body() body: { userId: string; attending: boolean }) {
    return this.eventsService.toggleRsvp(id, body.userId, body.attending);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.eventsService.deleteEvent(id, body.userId);
  }
}
