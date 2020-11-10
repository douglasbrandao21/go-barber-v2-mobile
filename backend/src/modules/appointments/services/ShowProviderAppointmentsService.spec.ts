import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ShowProviderAppointmentsService from './ShowProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let showProviderAppointmentsService: ShowProviderAppointmentsService;

describe('ShowProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    showProviderAppointmentsService = new ShowProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to show the appointments on specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 20, 8),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 7, 20, 16),
    });

    const appointmentsInDay = await showProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 20,
      month: 8,
      year: 2020,
    });

    expect(appointmentsInDay).toEqual([appointment1, appointment2]);
  });
});
