import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    CustomPassword,
    GitHub({
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: {
          prompt: "consent",
        },
      },
    }),
    Google({
      authorization: {
        url: "https://accounts.google.com/o/oauth2/auth",
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
});
