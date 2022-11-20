import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { GoogleUser } from 'src/db/entities/googleuser.entity';
import { User } from 'src/db/entities/user.entity';
@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.headers.authtoken;
            var decoded = jwt.verify(token, 'autodesk');
            const userId = decoded.id;
            const user = await User.findOne({ where: { id: userId } });
            const googleUser = await GoogleUser.findOne({ where: { id: userId } });
            if (user || googleUser) {
                return true;
            }
            return false;
        } catch (error) {

            throw new UnauthorizedException();
        }
    }
}