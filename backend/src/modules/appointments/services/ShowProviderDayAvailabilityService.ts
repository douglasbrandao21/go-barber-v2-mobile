import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ShowProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const currentDate = new Date(Date.now());

    const appointmentsInDay = await this.appointmentsRepository.findAllProviderAppointmentsInDay(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const firstAppointmentTime = 8;

    const hoursInDay = Array.from(
      { length: 10 },
      (value, index) => index + firstAppointmentTime,
    ); // [8, 9, 10, ...17];

    const availability = hoursInDay.map(hour => {
      const hasAppointmentsInHour = appointmentsInDay.find(
        appointment => getHours(appointment.date) === hour,
      );

      const currentAppointmentDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available:
          !hasAppointmentsInHour &&
          isAfter(currentAppointmentDate, currentDate),
      };
    });

    return availability;
  }
}

export default ShowProviderDayAvailabilityService;
