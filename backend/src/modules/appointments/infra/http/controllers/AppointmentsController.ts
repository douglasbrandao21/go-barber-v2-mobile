import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }
}
