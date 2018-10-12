import axios, {AxiosRequestConfig} from 'axios';
import {URL} from 'url';

import {ExceptionMapper, InvalidResponseError} from './APIException';
import {HttpMethod, HttpStatus, RequestOptions} from './Interfaces';

export class RequestService {
  private apiUrl: URL;

  constructor(apiUrl: string) {
    this.apiUrl = new URL(apiUrl);
  }

  public async delete(endpoint: string): Promise<boolean> {
    return this.request<boolean>('delete', endpoint);
  }

  public get<T>(endpoint: string, parameters?: RequestOptions): Promise<T> {
    return this.request<T>('get', endpoint);
  }

  public post<T>(endpoint: string, parameters?: RequestOptions): Promise<T> {
    return this.request<T>('post', endpoint);
  }

  public put<T>(endpoint: string, parameters?: RequestOptions): Promise<T> {
    return this.request<T>('put', endpoint);
  }

  public setApiUrl(apiUrl: string): void {
    this.apiUrl = new URL(apiUrl);
  }

  private async request<T>(method: HttpMethod, endpoint: string): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url: new URL(endpoint, this.apiUrl).href,
    };

    try {
      const {data, headers, status} = await axios.request<T>(config);

      const contentType = headers['content-type'] ? String(headers['content-type']) : undefined;

      if (contentType) {
        if (contentType.includes('application/json')) {
          return data;
        } else {
          throw new InvalidResponseError('The server responded with invalid data: No JSON sent.');
        }
      } else if (status === HttpStatus.NO_CONTENT) {
        return data;
      } else {
        throw new InvalidResponseError('The server responded with invalid data: No Content-Type set.');
      }
    } catch (error) {
      throw ExceptionMapper(error);
    }
  }
}
