import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature1Module } from '@first-app-feature1/feature1.module';
import * as fromRootServices from '@first-app/services';
import { ErrorService } from '@project-scope/ng-kit';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: Feature1Module
})
export class ApiService {
  private readonly baseUrl: string;
  private readonly entitiesBaseUrl: string;
  private readonly entity1Type: string;
  private readonly entity2Type: string;
  private readonly entity3Type: string;

  constructor(
    private apiService: fromRootServices.ApiBaseService,
    private errorService: ErrorService,
    private http: HttpClient
  ) {
    this.baseUrl = this.apiService.feature1Base;
    this.entitiesBaseUrl = `${this.baseUrl}/${this.apiService.entityFormatPath}?`;
  }

  getEntity1Entities(entityType: string): Observable<any> {
    const url = `${this.entitiesBaseUrl}${entityType}`;
    return this.getFeature1Entities(url, 'getEntity1Entities');
  }

  getEntity2Entities(entityType: string): Observable<any> {
    const url = `${this.entitiesBaseUrl}${entityType}`;
    return this.getFeature1Entities(url, 'getEntity2Entities');
  }

  getEntity3Entities(entityType: string): Observable<any> {
    const url = `${this.entitiesBaseUrl}${entityType}`;
    return this.getFeature1Entities(url, 'getEntity3Entities');
  }

  private getFeature1Entities(url: string, errorMsg: string): Observable<any> {
    return this.http.get<{ concreteData: any }>(url).pipe(
      map((data: { concreteData: any }) => data.concreteData),
      catchError(this.errorService.handleHttpError<any>(errorMsg))
    );
  }
}
