import otherAxios from "../interceptors/otherAxios";
import { UserProfile } from "../models/userProfile";

export const getCurrentUserProfile = async (): Promise<UserProfile> => {
  const resp = await otherAxios.get<UserProfile>("/self");

  return resp.data;
};
