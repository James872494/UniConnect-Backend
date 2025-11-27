// import { Body, Controller, Post } from '@nestjs/common';
// import { UsersService } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post('create')
//   async create(@Body() body: { supabaseId: string; fullName: string; email: string }) {
//     return this.usersService.create(body);
//   }

//   @Post('login')
//   async login(@Body() body: { email: string }) {
//     const user = await this.usersService.findByEmail(body.email);
//     if (!user) return { error: 'User not found' };

//     // Notify user on login
//     await this.usersService.notifyLogin(user._id.toString(), user.fullName);

//     return { message: `Welcome back, ${user.fullName}` };
//   }
// }

// users.controller.ts
// import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
// import { UsersService } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post('create')
//   async create(@Body() body: { supabaseId: string; fullName: string; email: string }) {
//     return this.usersService.create(body);
//   }

//   @Post('login')
//   async login(@Body() body: { email: string }) {
//     const user = await this.usersService.findByEmail(body.email);
//     if (!user) return { error: 'User not found' };

//     // Notify user on login
//     await this.usersService.notifyLogin(user._id.toString(), user.fullName);

//     return {
//       message: `Welcome back, ${user.fullName}`,
//       user: {
//         _id: user._id.toString(),
//         email: user.email,
//         fullName: user.fullName,
//         supabaseId: user.supabaseId,
//       },
//     };
//   }

//   // Add this new endpoint to get user by supabaseId
//   @Get('by-supabase-id')
//   async getBySupabaseId(@Headers('supabase-id') supabaseId: string) {
//     if (!supabaseId) return { error: 'Supabase ID required' };
//     const user = await this.usersService.findBySupabaseId(supabaseId);
//     if (!user) return { error: 'User not found' };
//     return {
//       _id: user._id.toString(),
//       email: user.email,
//       fullName: user.fullName,
//       supabaseId: user.supabaseId,
//     };
//   }
// }


import { 
  Body, 
  Controller, 
  Get, 
  Headers, 
  Post, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDocument } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() body: { supabaseId: string; fullName: string; email: string }) {
    return this.usersService.create(body);
  }

  @Post('login')
  async login(@Body() body: { email: string }) {
    const user: UserDocument | null = await this.usersService.findByEmail(body.email);
    if (!user) return { error: 'User not found' };

    await this.usersService.notifyLogin(user._id.toString(), user.fullName);

    return {
      message: `Welcome back, ${user.fullName}`,
      user: {
        _id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        supabaseId: user.supabaseId,
      },
    };
  }

  @Get('by-supabase-id')
  async getBySupabaseId(@Headers('supabase-id') supabaseId: string) {
    if (!supabaseId) return { error: 'Supabase ID required' };
    const user: UserDocument | null = await this.usersService.findBySupabaseId(supabaseId);
    if (!user) return { error: 'User not found' };
    
    return {
      _id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      bio: user.bio || '',
      supabaseId: user.supabaseId,
    };
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  // ✅ UPDATE ENDPOINT - Works with Settings page
  @Post('update')
  async update(@Body() body: { supabaseId: string; fullName: string; email: string; bio?: string }) {
    try {
      const { supabaseId, ...updateData } = body;
      const updatedUser = await this.usersService.updateBySupabaseId(supabaseId, updateData);
      return {
        message: 'Profile updated successfully',
        user: {
          _id: updatedUser._id.toString(),
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          bio: updatedUser.bio || '',
          supabaseId: updatedUser.supabaseId,
        }
      };
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
