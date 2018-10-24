import { Injectable } from '@angular/core';
import { ConfigService } from '@first-app-core/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private configService: ConfigService) {}

  get feature1Base(): string {
    return `${this.configService.apiBase}/${this.configService.apiPathFeatures.feature1}/${
      this.configService.apiPathSegments.api
    }/${this.configService.apiPathSegments.version}/${this.configService.apiPathEndpoints.items}`;
  }

  get entityFormatPath(): string {
    return `${this.configService.apiPathSegments.formatted}/${
      this.configService.apiPathSegments.entityPattern
    }`;
  }
}
