import { Response } from 'express';
import { AuthCookieName } from 'src/app/common/models';

export const adaptCookie = (access_token: string, response: Response) => {
  response.cookie(AuthCookieName, access_token, cookieOptions);
};

export const deleteCookie = (response: Response) => {
  response.cookie(AuthCookieName, null, cookieOptions);
};

const cookieOptions = (() => {
  const webAppDomain = process.env.WEB_APP_DOMAIN;

  const cookieOptions = {
    httpOnly: true,
    domain: webAppDomain,
  };

  return cookieOptions;
})();
