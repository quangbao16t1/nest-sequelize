import { User } from "src/models/user.model";

export const userProviders = [
  {
    provide: "USER_REPOSITORY",
    useValue: User,
  },
];
