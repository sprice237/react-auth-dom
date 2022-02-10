import { useState, VFC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import {
  EmailAuthProvider,
  getFirebaseErrorMessage,
  useLinkWithCredential,
} from '@sprice237/react-auth';
import { ButtonContainer } from '$/components/ui/ButtonContainer';
import { PasswordRegistrationForm } from '$/components/forms/password-registration/PasswordRegistrationForm';

export interface LinkPasswordAuthProviderModalProps {
  Loading?: VFC;
  onComplete: () => void;
  onCancel: () => void;
}

export const LinkPasswordAuthProviderModal: VFC<LinkPasswordAuthProviderModalProps> = ({
  Loading,
  onComplete,
  onCancel,
}) => {
  const linkWithCredential = useLinkWithCredential();

  const [isInProgress, setIsInProgress] = useState(false);
  const [error, setError] = useState<string>();

  const submit = async ({ email, password }: { email: string; password: string }) => {
    try {
      setIsInProgress(true);
      const emailAuthCredential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(emailAuthCredential);
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
                <PasswordRegistrationForm error={error} onSubmit={submit} />
                <ButtonContainer>
                  <Button type="button" color="secondary" onClick={onCancel}>
                    Cancel
                  </Button>
                </ButtonContainer>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};
