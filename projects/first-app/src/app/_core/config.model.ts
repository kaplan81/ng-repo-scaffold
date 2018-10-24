
export interface ConfigFile {
  app: ConfigApp;
  api: ConfigApi;
}

export interface ConfigApi {
  base: string;
  paths: ApiPaths;
}

export interface ApiPaths {
  features: FeaturePaths;
  segments: SegmentPaths;
  endpoints: EndpointPaths;
}

export interface EndpointPaths {
  items: string;
}

export interface SegmentPaths {
  api: string;
  version: string;
  formatted: string;
  entityPattern: string;
}

export interface FeaturePaths {
  feature1: string;
}

export interface ConfigApp {
  base: string;
}
