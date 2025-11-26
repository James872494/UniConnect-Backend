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
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() body: { supabaseId: string; fullName: string; email: string }) {
    return this.usersService.create(body);
  }

  @Post('login')
  async login(@Body() body: { email: string }) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) return { error: 'User not found' };

    // Notify user on login
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

  // Add this new endpoint to get user by supabaseId
  @Get('by-supabase-id')
  async getBySupabaseId(@Headers('supabase-id') supabaseId: string) {
    if (!supabaseId) return { error: 'Supabase ID required' };
    const user = await this.usersService.findBySupabaseId(supabaseId);
    if (!user) return { error: 'User not found' };
    return {
      _id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      supabaseId: user.supabaseId,
    };
  }
}