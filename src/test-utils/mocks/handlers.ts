import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://example.com/success', async () => {
    return HttpResponse.json({
      message: 'ok',
    });
  }),

  http.post('https://example.com/post', async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        received: body,
        success: true,
      },
      { status: 201 }
    );
  }),

  http.get('https://example.com/error', async () => {
    return new HttpResponse('Internal Server Error', { status: 500 });
  }),

  http.get('https://example.com/network-error', async () => {
    throw new Error('Failed to connect');
  }),
];
