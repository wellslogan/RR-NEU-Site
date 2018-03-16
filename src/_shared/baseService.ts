const checkUnauthorized = response => {
  if (response.status === 401) {
    if (sessionStorage.getItem('jwtToken') != null) {
      // need to login again
      window.location.href = '/login?again=true';
      return;
    }
    window.location.href = '/login';
    return;
  }
};

const handleResponse = response => {
  checkUnauthorized(response);

  if (!response.ok) {
    return response.json().then(err => Promise.reject(err));
  }

  return response.json();
};

const getHeaders = () => {
  const headers = new Headers();
  headers.set('content-type', 'application/json');

  const token = sessionStorage.getItem('jwtToken');

  if (token) {
    headers.set('Authorization', 'Bearer ' + token);
  }
  return headers;
};

export function get<T>(url): Promise<T> {
  return fetch(process.env.API_URI + url, {
    method: 'GET',
    headers: getHeaders(),
  }).then(handleResponse);
}

export function post<T>(url, payload): Promise<T> {
  return fetch(process.env.API_URI + url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: getHeaders(),
  }).then(handleResponse);
}

export function httpDelete<T>(url): Promise<T> {
  return fetch(process.env.API_URI + url, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(handleResponse);
}
