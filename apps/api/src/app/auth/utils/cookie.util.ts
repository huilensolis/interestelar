import { CookieOptions, Response } from 'express';
import { AuthCookieName } from 'src/app/common/models';

export const adaptCookie = (access_token: string, response: Response) => {
  response.cookie(AuthCookieName, access_token, getCookieOptions());
};

export const deleteCookie = (response: Response) => {
  response.cookie(
    AuthCookieName,
    'null',
    getCookieOptions(new Date(new Date().setTime(1))),
  );
};

const getCookieOptions = (
  expDate: Date = new Date(
    new Date().setTime(new Date().getTime() + 1000 * 60 * 60 * 24 * 14), // 14 days
  ),
) => {
  const webAppDomain = process.env.WEB_APP_DOMAIN;

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    domain: webAppDomain,
    secure: true,
    sameSite: 'strict',
    expires: expDate,
  };

  return cookieOptions;
};
