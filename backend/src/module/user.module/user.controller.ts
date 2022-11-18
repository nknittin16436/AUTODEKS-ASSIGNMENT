import { Body, Controller, Get, Post, Param, Delete, Patch, UseGuards, Headers, Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
// import { RoleGuard } from 'src/guards/role.guard';
import { UserService } from './user.service';
@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get('')
    getUsers(): any {
        return this.userService.getAllUsers();
    }

    @Post('/signup')
    createUser(@Body() { name, email, phone, password }): any {
        return this.userService.createUser(name, email, phone, password);
    }

    @Post('/login')
    doUserLogin(@Body() { email, password }): any {
        return this.userService.doUserLogin(email, password);
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    doUserUpdate(@Param('id') id: string, @Body() { name, email, role }): any {
        return this.userService.updateUser(id, name, email, role);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    deleteUser(@Param('id') id: string): any {
        return this.userService.deleteUser(id);
    }


    @Get('/:token')
    getUser(@Param('token') token: string): any {
        return this.userService.getUser(token);
    }

}
