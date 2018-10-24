/* tslint:disable:no-unused-variable */
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@first-app-feature1/services/feature1.service';
import { ErrorService } from '@project-scope/ng-kit';
import { map } from 'rxjs/operators';

interface Data {
  name: string;
}

const apiServiceMock = jest.fn<ApiService>(() => ({
  feature1Base: 'https://dev.domain.com/feature1/api/v-test/items',
  entityFormatPath: 'formatted/entityPattern'
}));

const baseUrl = `${apiServiceMock().feature1Base}/${apiServiceMock().entityFormatPath}`;

describe('ApiService', () => {
  let apiService: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  // let apiService: ApiService;
  let entitiesCount: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // We need to include ApiService itself since it is not providedIn 'root'.
      providers: [ApiService, ErrorService, { provide: ApiService, useClass: apiServiceMock }]
    });
    apiService = TestBed.get(ApiService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // apiService = TestBed.get(ApiService);
    entitiesCount = 5;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can be instantiated via DI', () => {
    expect(apiService instanceof ApiService).toBe(true);
  });

  it('getEntity1Entities returns expected entity1 entities', () => {
    const url = baseUrl + `?type=entity1`;
    const testData: Data = { name: 'Test Data' };

    httpClient
      .get<{ concreteData: any }>(url)
      .pipe(map((data: { concreteData: any }) => data.concreteData))
      .subscribe((feature1Entities: any) => {
        expect(feature1Entities).toEqual(testData);
      });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('getEntity2Entities returns expected entity2 entities', () => {
    const url = baseUrl + `?type=entity1`;
    const testData: Data = { name: 'Test Data' };

    httpClient
      .get<{ concreteData: any }>(url)
      .pipe(map((data: { concreteData: any }) => data.concreteData))
      .subscribe((feature1Entities: any) => {
        expect(feature1Entities).toEqual(testData);
      });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('getEntity3Entities returns expected entity2 entities', () => {
    const url = baseUrl + `?type=entity1`;
    const testData: Data = { name: 'Test Data' };

    httpClient
      .get<{ concreteData: any }>(url)
      .pipe(map((data: { concreteData: any }) => data.concreteData))
      .subscribe((feature1Entities: any) => {
        expect(feature1Entities).toEqual(testData);
      });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

});
