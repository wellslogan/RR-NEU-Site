const baseUri = process.env.API_URI;

class ApiService {
  public static get(url: string) {
    return fetch(baseUri + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'default',
    }).then(res => res.json());
  }

  public static post(url: string, payload: any) {
    return fetch(baseUri + url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(res => res.json());
  }
}

export { ApiService };
