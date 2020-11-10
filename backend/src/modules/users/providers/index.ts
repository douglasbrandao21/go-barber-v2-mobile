import { container } from 'tsyringe';
import BCrypt from './HashProviders/implementations/BCrypt';
import IHashProvider from './HashProviders/models/IHashProviders';

container.registerSingleton<IHashProvider>('HashProvider', BCrypt);
