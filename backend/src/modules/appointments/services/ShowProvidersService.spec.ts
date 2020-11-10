import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ShowProvidersService from './ShowProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let showProviders: ShowProvidersService;

describe('ShowProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    showProviders = new ShowProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show all providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'johndoe',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: 'johntre',
    });

    const authenticatedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johntre@example.com',
      password: 'johntre',
    });

    const providers = await showProviders.execute({
      user_id: authenticatedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
