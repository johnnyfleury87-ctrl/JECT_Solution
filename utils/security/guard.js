import { forbiddenResponse } from '@/utils/security/responses';

function readTokenFromRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  const customHeader = request.headers.get('x-internal-token');
  if (customHeader) {
    return customHeader.trim();
  }

  return '';
}

export function requireInternalTokenInProduction(request, envVarName) {
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    return null;
  }

  const expectedToken = process.env[envVarName];
  const providedToken = readTokenFromRequest(request);

  if (!expectedToken || !providedToken || providedToken !== expectedToken) {
    return forbiddenResponse();
  }

  return null;
}
