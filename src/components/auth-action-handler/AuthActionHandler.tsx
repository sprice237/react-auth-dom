import { useEffect, VFC } from 'react';
import { useApplyActionCode } from '@sprice237/react-auth';
import { useFirebaseActionParams } from './hooks';

export type AuthActionHandlerProps = {
  onResetPasswordAction?: (oobCode: string) => void;
  onVerifyEmailAction?: () => void;
  onNoAction: () => void;
};

export const AuthActionHandler: VFC<AuthActionHandlerProps> = ({
  onResetPasswordAction,
  onVerifyEmailAction,
  onNoAction,
}) => {
  const firebaseActionParams = useFirebaseActionParams();
  const applyActionCode = useApplyActionCode();

  const onVerifyEmail = async (oobCode: string): Promise<void> => {
    await applyActionCode(oobCode);

    if (onVerifyEmailAction) {
      onVerifyEmailAction();
    }
  };

  useEffect(() => {
    const { mode, oobCode } = firebaseActionParams ?? { mode: null, oobCode: null };

    if (mode === 'resetPassword' && oobCode && onResetPasswordAction) {
      onResetPasswordAction(oobCode);
    } else if (mode === 'verifyEmail' && oobCode) {
      onVerifyEmail(oobCode).catch(console.error);
    } else {
      onNoAction();
    }
  }, [firebaseActionParams]);

  return null;
};
