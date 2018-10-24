/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@first-app-core/config.service';
import { ApiService } from '@first-app/services/api.service';

const configServiceMock = jest.fn<ConfigService>(() => ({
  apiBase: 'http://first-app.domain.com:7070',
  apiPathFeatures: {
    feature1: 'feature1'
  },
  apiPathSegments: {
    api: 'api',
    version: 'v1',
    formatted: 'formatted',
    entityPattern: 'entityPattern'
  },
  apiPathEndpoints: {
    items: 'items'
  }
}));

describe('ApiService', () => {
  let apiService: ApiService;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ConfigService, useClass: configServiceMock }]
    });
    apiService = TestBed.get(ApiService);
    configService = TestBed.get(ConfigService);
  });

  it('can be instantiated via DI', () => {
    expect(apiService instanceof ApiService).toBe(true);
  });

  it('gets its properties from ConfigService', () => {
    const feature1Base = `${configService.apiBase}/${configService.apiPathFeatures.feature1}/${
      configService.apiPathSegments.api
    }/${configService.apiPathSegments.version}/${configService.apiPathEndpoints.items}`;
    const entityFormatPath = `${configService.apiPathSegments.formatted}/${
      configService.apiPathSegments.entityPattern
    }`;

    expect(apiService.feature1Base).toEqual(feature1Base);
    expect(apiService.entityFormatPath).toEqual(entityFormatPath);
  });
});
