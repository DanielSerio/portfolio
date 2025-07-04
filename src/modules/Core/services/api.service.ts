type RequestOptions = Omit<RequestInit, 'method' | 'body'>;
type Method = 'GET' | 'PUT' | "PATCH" | 'POST' | 'DELETE';

interface ServiceRequestOptions<M extends Method, T> {
  body?: M extends 'GET' | 'DELETE' ? never : T;
  options?: RequestOptions;
}

export abstract class ApiService {
  protected _BASE_URL;
  protected _DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
  };

  constructor(baseUrl: string) {
    this._BASE_URL = baseUrl;
  }

  private getDefaultOptions = <T, M extends Method>(method: M, { body, options }: ServiceRequestOptions<M, T>) => {
    return {
      ...options,
      method,
      headers: {
        ...this._DEFAULT_HEADERS,
        ...options?.headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    };
  };

  private REQUEST<T, M extends Method>(method: M, path: string, { options, body }: ServiceRequestOptions<M, T>) {
    const url = `${this._BASE_URL}${path}`;

    if (method === 'GET' || method === 'DELETE') {
      const allOptions = this.getDefaultOptions(method, { options });

      return fetch(url, allOptions);
    }

    const allOptions = this.getDefaultOptions('POST', { body, options });

    return fetch(url, allOptions);
  }

  protected GET(path: string, options?: RequestOptions) {
    return this.REQUEST('GET', path, { options });
  }

  protected POST<T>(path: string, body: T, options?: RequestOptions) {
    return this.REQUEST('POST', path, { options, body });
  }

  protected PUT<T>(path: string, body: T, options?: RequestOptions) {
    return this.REQUEST('PUT', path, { options, body });
  }

  protected PATCH<T>(path: string, body: T, options?: RequestOptions) {
    return this.REQUEST('PATCH', path, { options, body });
  }

  protected DELETE(path: string, options?: RequestOptions) {
    return this.REQUEST('DELETE', path, { options });
  }
}