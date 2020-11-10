import { Request, Response } from 'express';

import ShowProviderDayAvailabilityService from '@modules/appointments/services/ShowProviderDayAvailabilityService';
import { container } from 'tsyringe';

export default class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const showProviderDayAvailability = container.resolve(
      ShowProviderDayAvailabilityService,
    );

    const availability = await showProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
