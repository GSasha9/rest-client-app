import { http, HttpResponse } from 'msw';

//template for the future, needs to be changed
export const handlers = [
  http.get('https://', () => {
    return HttpResponse.json({ id: 1, title: 'Mocked title' }, { status: 200 });
  }),
];
