import { useState, VFC } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import {
  getFirebaseErrorMessage,
  ChangePasswordFormData,
  useUpdatePassword,
} from '@sprice237/react-auth';
import { ChangePasswordForm } from '$/components/forms/change-password/ChangePasswordForm';

export interface ChangePasswordModalProps {
  Loading?: VFC;
  onComplete: () => void;
  onCancel: () => void;
}

export const ChangePasswordModal: VFC<ChangePasswordModalProps> = ({
  Loading,
  onComplete,
  onCancel,
}) => {
  const updatePassword = useUpdatePassword();

  const [isInProgress, setIsInProgress] = useState(false);
  const [error, setError] = useState<string>();

  const submit = async ({
    currentPassword,
    newPassword,
    newPasswordConfirm,
  }: ChangePasswordFormData) => {
    setError(undefined);

    if (newPassword !== newPasswordConfirm) {
      setError('New passwords do not match');
      return;
    }

    try {
      setIsInProgress(true);
      await updatePassword(currentPassword, newPassword);
      onComplete();
    } catch (e) {
      setError(getFirebaseErrorMessage(e));
    } finally {
      setIsInProgress(false);
    }
  };

  return (
    <>
      {isInProgress && Loading && <Loading />}
      <Modal open>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: '100%', width: '100%' }}
        >
          <Grid item style={{ width: '500px' }}>
            <Card>
              <Box m={5}>
                <ChangePasswordForm error={error} onCancel={onCancel} onSubmit={submit} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
