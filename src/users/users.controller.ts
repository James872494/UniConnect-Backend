import { Body, Controller, Post } from '@nestjs/common';
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

    return { message: `Welcome back, ${user.fullName}` };
  }
}
