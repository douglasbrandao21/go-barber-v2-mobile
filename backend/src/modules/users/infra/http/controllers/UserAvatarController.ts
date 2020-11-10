import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const uploadUserAvatar = container.resolve(UploadUserAvatarService);

    const user = await uploadUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
