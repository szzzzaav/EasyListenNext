"use client";

import { Subscription, UserDetails } from "@/types";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/auth-helpers-nextjs";

type myUserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  subscription: Subscription | null;
  isLoading: boolean;
};

const myUserContext = createContext<myUserContextType | undefined>(undefined);

interface Props {
  [k: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const getUserDeatils = () => supabase.from("users").select("*").single();
  const getSubscriptions = () =>
    supabase
      .from("subscription")
      .select("*")
      .in("status", ["trialing", "active"])
      .single();
  useEffect(() => {
    if (user && !isLoadingData && !subscription && !userDetails) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDeatils(), getSubscriptions()]).then((res) => {
        const UserDetailPromise = res[0];
        const SubscriptionPromise = res[1];
        if (UserDetailPromise.status === "fulfilled") {
          setUserDetails(UserDetailPromise.value.data);
        }
        if (SubscriptionPromise.status === "fulfilled") {
          setSubscription(SubscriptionPromise.value.data);
        }
        setIsLoadingData(false);
      });
    }
    if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value: myUserContextType = {
    accessToken,
    user,
    userDetails,
    subscription,
    isLoading: isLoadingData && isLoadingUser,
  };

  return <myUserContext.Provider value={value} {...props} />;
};

export default function useUser() {
  const context = useContext(myUserContext);
  if (context === undefined) {
    throw new Error("userContext must use inside userContextProvider");
  }
  return context;
}
