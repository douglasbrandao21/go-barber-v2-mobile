import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowProvidersService from '@modules/appointments/services/ShowProvidersService';

export default class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProvidersService = container.resolve(ShowProvidersService);

    const providers = await showProvidersService.execute({
      user_id,
    });

    return response.json(classToClass(providers));
  }
}
