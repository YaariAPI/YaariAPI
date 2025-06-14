import { useParams, useSearchParams } from 'react-router-dom';

import { useAuth } from '@src/modules/auth/hooks/useAuth';
// import { BillingCheckoutSession } from '@/auth/types/billingCheckoutSession.type';

export const useSignInWithGoogle = () => {
  console.log("..........................", useParams());
  const workspaceInviteToken = useParams().workspaceInviteToken;
  // const [searchParams] = useSearchParams();
  // const workspacePersonalInviteToken =
  //   searchParams.get('inviteToken') ?? undefined;
  // const billingCheckoutSession = {
  //   plan: 'PRO',
  //   interval: 'Month',
  //   requirePaymentMethod: true,
  // } as BillingCheckoutSession;

  const { signInWithGoogle } = useAuth();
  return {
    signInWithGoogle: () =>
      signInWithGoogle({
        workspaceInviteToken,
      }),
  };
};
