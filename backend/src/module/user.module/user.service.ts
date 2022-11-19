import { Injectable, UnauthorizedException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { EmailSchema, LoginSchema, NameSchema, RoleSchema, SignUpSchema } from 'src/JoiSchema/joiSchema';
const pageSize = 6;

@Injectable()
export class UserService {

    async getAllUsers(page: number): Promise<any> {
        try {
            const allUsers = await User.find();
            const users = allUsers.slice((page - 1) * pageSize, page * pageSize);
            const totalUsers = allUsers.length;

            return { users, totalUsers, success: true }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUser(token: string): Promise<any> {
        try {
            var decoded = jwt.verify(token, 'bikeReservation');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });

            if (user) {
                delete user.password;
                return { user, success: true, statusCode: 200 }
            }
            else throw new HttpException('User does not exist', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async createUser(name: string, email: string, phone: string, password: string): Promise<any> {
        try {
            const isUser = await User.findOne({ where: { email: email } });
            if (isUser) {
                console.log(isUser)
                throw new HttpException('Email already Exist', 400);
            }

            const user = new User();
            user.name = name.trim();
            user.email = email;
            const hashedPassword = await bcrypt.hashSync(password, 10);
            user.password = hashedPassword;
            user.phone = phone;
            console.log(user)
            await user.save();
            return { success: true, statusCode: 201 };
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }


    async doUserLogin(email: string, password: string): Promise<any> {
        try {
            const insensitiveEmail = email.slice(0, email.indexOf("@")).toLowerCase() +
                email.slice(email.indexOf("@"));
            try {
                await LoginSchema.validateAsync({ email: insensitiveEmail, password: password });
            } catch (error) {
                throw new HttpException(error.message, 400);

            }
            const user = await User.findOne({ where: { email: insensitiveEmail } });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id, time: Date.now() }, 'bikeReservation', { expiresIn: '24h' });
                // delete user.password;
                return { user, accessToken: token, success: true, statusCode: 200 };
            }
            else throw new HttpException('Invalid email or password', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }



    async updateUser(id: string, name: string, email: string, role: string): Promise<any> {
        // console.log(name, email, role);
        try {
            const insensitiveEmail = email.slice(0, email.indexOf("@")).toLowerCase() +
                email.slice(email.indexOf("@"));

            try {
                if (name === "" || name) {
                    await NameSchema.validateAsync({ name: name });
                }
                if (email === "" || email) {
                    await EmailSchema.validateAsync({ email: insensitiveEmail });
                }
                if (role === "" || role) {
                    await RoleSchema.validateAsync({ role: role });

                }
            } catch (error) {
                throw new HttpException(error.message, 400);

            }
            const user = await User.findOne({
                where: { id: id }
            });
            if (user) {
                await User.update(id, { name, email: insensitiveEmail });

                return { success: true, statusCode: 200 }
            }
            else throw new NotFoundException('User not found');


        } catch (error) {

            // console.log(error)
            if (error.errno === 19) {

                throw new HttpException("Email already Exist", 400);
            }
            throw new HttpException(error, error.status);
        }
    }

    async deleteUser(id: string): Promise<any> {
        try {
            const user = await User.findOne({ where: { id: id } });
            if (user) {
                await User.delete(id);
                return { success: true, statusCode: 200 }
            }
            else throw new HttpException('Unable to delete user', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}