import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { User } from 'src/db/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { GoogleUser } from 'src/db/entities/googleuser.entity';
const pageSize = 6;

@Injectable()
export class UserService {

    async getAllUsers(page: number): Promise<any> {
        // main().catch(console.error);
        try {
            const allGoogleUsers = await GoogleUser.find();
            const allNormalUsers = await User.find();
            const allUsers = [...allNormalUsers, ...allGoogleUsers];
            const users = allUsers.slice((page - 1) * pageSize, page * pageSize);
            const totalUsers = allUsers.length;

            return { users, totalUsers, success: true }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUser(token: string): Promise<any> {
        try {
            var decoded = jwt.verify(token, 'autodesk');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });
            const googleUser = await GoogleUser.findOne({ where: { id: userId } });

            if (user || googleUser) {
                delete user.password;
                return { user, success: true, statusCode: 200 }
            }
            else throw new HttpException('User does not exist', 400);
        } catch (error) {
            console.log(error.message)
            if (error.message === "jwt expired") {

                throw new HttpException(error, 400);
            }
            throw new HttpException(error, error.status);
        }
    }


    async createUser(name: string, email: string, phone: string, password: string): Promise<any> {
        console.log(name, email, phone, password)
        try {
            const isGoogleUser = await GoogleUser.findOne({ where: { email: email } });
            if (isGoogleUser) {
                throw new HttpException('This email is registered using Google Auth Please Login using Google', 400);
            }
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

            const isGoogleUser = await GoogleUser.findOne({ where: { email: email } });
            if (isGoogleUser) {
                throw new HttpException('This email is registered using Google Auth Please Login using Google', 400);
            }
            const user = await User.findOne({ where: { email: email } });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id, time: Date.now() }, 'autodesk', { expiresIn: '24h' });
                // delete user.password;
                return { user, accessToken: token, success: true, statusCode: 200 };
            }
            else throw new HttpException('Invalid email or password', 400);
        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }



    async updateUser(id: string, name: string, email: string, phone: string, isResetPassword: boolean): Promise<any> {
        try {
            const user = await User.findOne({
                where: { id: id }
            });
            if (user) {
                await User.update(id, { name, email: email, phone: phone });
                if (isResetPassword) {
                    const hashedPassword = await bcrypt.hashSync("Abcd1234$", 10);
                    await User.update(id, { password: hashedPassword });

                }

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
            const googleUser = await GoogleUser.findOne({ where: { id: id } });
            if (googleUser) {
                await GoogleUser.delete(id);
                return { success: true, statusCode: 200 }
            }
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


    async googleLogin(email: string, name: string): Promise<any> {
        try {
            const isUser = await GoogleUser.findOne({ where: { email: email } });
            if (isUser) {
                const token = jwt.sign({ id: isUser.id, time: Date.now() }, 'autodesk', { expiresIn: '24h' });
                return { user: isUser, accessToken: token, success: true, statusCode: 200 };
            }
            else {
                const user = new GoogleUser();
                user.name = name;
                user.email = email;
                await user.save();
                const token = jwt.sign({ id: user.id, time: Date.now() }, 'autodesk', { expiresIn: '24h' });
                return { user, accessToken: token, success: true, statusCode: 200 };
            }

        } catch (error) {
            throw new HttpException(error, error.status);

        }
    }

}