/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'https://i8jcq8noel.execute-api.eu-central-1.amazonaws.com';
}

/**
 * Parameters for `ApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}
