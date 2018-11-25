/* tslint:disable:no-unused-variable */
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ErrorService } from '../error/error.service';
import { configFileparams, ConfigFileService } from './config-file.service';
import * as configFile from './config-file.spec.json';

describe('ConfigFileService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let configFileService: ConfigFileService;
  let url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigFileService, ErrorService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    configFileService = TestBed.get(ConfigFileService);
    url = './config-file.spec.json';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can be instantiated via DI', () => {
    expect(configFileService instanceof ConfigFileService).toBe(true);
  });

  it('can get the json and set configs', () => {
    httpClient.get<any>(url).subscribe(data => {
      expect(data).toEqual(configFile);
      expect(configFileService.configs).toEqual(data);
    });
    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual('GET');

    req.flush(configFile);
  });

  it('can get the json with params', () => {
    httpClient
      .get<any>(url, { params: configFileparams })
      .subscribe(data => expect(data).toEqual(configFile));

    const req = httpTestingController.expectOne(
      r => r.params.has('configRequest') && r.params.has('v')
    );

    req.flush(configFile);
  });
});
