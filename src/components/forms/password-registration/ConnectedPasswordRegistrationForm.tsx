import { memo, VFC } from 'react';
import { usePasswordRegistrationForm } from '@sprice237/react-auth';
import { LoadingOverlay } from '$/components/ui/LoadingSpinner';
import { PasswordRegistrationForm } from './PasswordRegistrationForm';

export const ConnectedPasswordRegistrationForm: VFC = memo(() => {
  const { error, inProgress, submit } = usePasswordRegistrationForm();

  return (
    <LoadingOverlay isLoading={inProgress}>
      <PasswordRegistrationForm error={error} onSubmit={submit} />
    </LoadingOverlay>
  );
});
