import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllProviderAppointmentsInMonthDTO from '../dtos/IFindAllProviderAppointmentsInMonthDTO';
import IFindAllProviderAppointmentsInDayDTO from '../dtos/IFindAllProviderAppointmentsInDayDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllProviderAppointmentsInMonth(
    data: IFindAllProviderAppointmentsInMonthDTO,
  ): Promise<Appointment[]>;
  findAllProviderAppointmentsInDay(
    data: IFindAllProviderAppointmentsInDayDTO,
  ): Promise<Appointment[]>;
}
