import { memo, VFC } from 'react';
import { LoadingOverlay } from '$/components/ui/LoadingSpinner';
import {
  getFirebaseErrorMessage,
  useFirebaseAuthContext,
  usePasswordLoginForm,
} from '@sprice237/react-auth';
import { PasswordLoginForm } from './PasswordLoginForm';

export const ConnectedPasswordLoginForm: VFC = memo(() => {
  const { redirectError } = useFirebaseAuthContext();
  const { error, inProgress, submit } = usePasswordLoginForm();

  const redirectErrorMessage = redirectError ? getFirebaseErrorMessage(redirectError) : undefined;

  const errorMessage = error ?? redirectErrorMessage;

  return (
    <LoadingOverlay isLoading={inProgress}>
      <PasswordLoginForm error={errorMessage} onSubmit={submit} />
    </LoadingOverlay>
  );
});
