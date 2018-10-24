/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import * as fromCoreModels from '@first-app-core/config.model';
import { ConfigService } from '@first-app-core/config.service';
import { ConfigFileService } from '@project-scope/ng-kit';
import { of } from 'rxjs';

const configFileMock: fromCoreModels.ConfigFile = {
  app: {
    base: 'http://first-app.domain.com:7070'
  },
  api: {
    base: 'https://dev.domain.com',
    paths: {
      features: {
        feature1: 'feature1'
      },
      segments: {
        api: 'api',
        version: 'v1',
        formatted: 'formatted',
        entityPattern: 'entityPattern'
      },
      endpoints: {
        items: 'items'
      }
    }
  }
};

const configFileServiceMock = jest.fn<ConfigFileService>(() => ({
  configFile: jest.fn(() => of(configFileMock))
}));

describe('ConfigService', () => {
  let configService: ConfigService;
  let fileService: ConfigFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ConfigFileService, useClass: configFileServiceMock }]
    });
    configService = TestBed.get(ConfigService);
    fileService = TestBed.get(ConfigFileService);
  });

  it('can be instantiated via DI', () => {
    expect(configService instanceof ConfigService).toBe(true);
  });

  it('gets its properties from ConfigFileService', async () => {
    async function appInitializer(): Promise<fromCoreModels.ConfigFile> {
      return await configService.loadConfig().toPromise();
    }
    fileService.configs = await appInitializer();

    expect(configService.app).toEqual(fileService.configs.app);
    expect(configService.apiBase).toEqual(fileService.configs.api.base);
    expect(configService.apiPathFeatures).toEqual(fileService.configs.api.paths.features);
    expect(configService.apiPathSegments).toEqual(fileService.configs.api.paths.segments);
    expect(configService.apiPathEndpoints).toEqual(fileService.configs.api.paths.endpoints);
  });
});
