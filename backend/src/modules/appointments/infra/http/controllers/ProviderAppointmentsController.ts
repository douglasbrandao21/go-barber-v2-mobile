import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ShowProviderAppointmentsService from '@modules/appointments/services/ShowProviderAppointmentsService';

export default class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;
    const provider_id = request.user.id;

    const showProviderAppointmentsService = container.resolve(
      ShowProviderAppointmentsService,
    );

    const appointmentsInDay = await showProviderAppointmentsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointmentsInDay);
  }
}
