import authAxios from "../interceptors/authAxios";
import { ISignInBody } from "../models/SignIn";
import { UserProfile } from "../models/userProfile";

export const signInFn = async ({
  email,
  password,
}: ISignInBody): Promise<{
  userProfile: UserProfile;
  access_token: string;
}> => {
  const resp = await authAxios.post<{
    userProfile: UserProfile;
    access_token: string;
  }>("/auth/sigin", {
    email,
    password,
  });

  return resp.data;
};
