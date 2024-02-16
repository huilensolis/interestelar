import { CanActivate } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TGuard = CanActivate | Function;

export type TGuardsArray = TGuard[];
