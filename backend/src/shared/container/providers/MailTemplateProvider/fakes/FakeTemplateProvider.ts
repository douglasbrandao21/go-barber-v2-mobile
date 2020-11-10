import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}

export default FakeTemplateProvider;
