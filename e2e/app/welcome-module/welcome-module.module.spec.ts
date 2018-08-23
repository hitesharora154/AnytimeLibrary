import { WelcomeModuleModule } from './welcome-module.module';

describe('WelcomeModuleModule', () => {
  let welcomeModuleModule: WelcomeModuleModule;

  beforeEach(() => {
    welcomeModuleModule = new WelcomeModuleModule();
  });

  it('should create an instance', () => {
    expect(welcomeModuleModule).toBeTruthy();
  });
});
