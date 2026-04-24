export function noStoreHeaders(extraHeaders = {}) {
  return {
    'Cache-Control': 'no-store, must-revalidate',
    ...extraHeaders,
  };
}

export function genericErrorResponse(status = 500) {
  return Response.json(
    { error: 'Une erreur est survenue.' },
    {
      status,
      headers: noStoreHeaders(),
    }
  );
}

export function rateLimitExceededResponse(retryAfterSeconds) {
  return Response.json(
    { error: 'Une erreur est survenue.' },
    {
      status: 429,
      headers: noStoreHeaders({
        'Retry-After': String(retryAfterSeconds),
      }),
    }
  );
}

export function forbiddenResponse() {
  return Response.json(
    { error: 'Une erreur est survenue.' },
    {
      status: 403,
      headers: noStoreHeaders(),
    }
  );
}
