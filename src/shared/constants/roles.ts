export const UserRole = {
  Client: 0,
  Freelancer: 1,
  Admin: 2,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];