import { container } from 'tsyringe';
import uploadConfig from '@config/upload';
import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProviders';

const providers = {
  disk: DiskStorageProvider,
  S3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);