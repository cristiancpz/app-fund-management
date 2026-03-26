export const NOTIFICATONS_TYPES = {
  EMAIL: 'email',
  SMS: 'sms'
};

export type notificationsTypes = typeof NOTIFICATONS_TYPES[keyof typeof NOTIFICATONS_TYPES];
