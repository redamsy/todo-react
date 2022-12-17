import { AxiosResponse } from "axios";
import authAxios from "../interceptors/authAxios";
import { ISignUpBody } from "../models/SignUp";
import { UserProfile } from "../models/userProfile";

export const signUpFn = async ({
  name,
  email,
  password,
}: ISignUpBody): Promise<
  AxiosResponse<{
    userProfile: UserProfile;
  }>
> => {
  const resp = await authAxios.post<{
    userProfile: UserProfile;
  }>("/user", {
    name,
    email,
    password,
  });

  return resp;
};
