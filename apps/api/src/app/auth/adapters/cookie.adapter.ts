import { Response } from 'express';
import { AuthCookieName } from 'src/app/common/models';

export const adaptCookie = (access_token: string, response: Response) => {
  const webAppDomain = process.env.WEB_APP_DOMAIN;

  response.cookie(AuthCookieName, access_token, {
    httpOnly: true,
    domain: webAppDomain,
  });
};
