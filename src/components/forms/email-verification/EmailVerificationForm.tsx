import { memo, VFC } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEmailVerificationForm, useSignOut } from '@sprice237/react-auth';
import { ButtonContainer } from '$/components/ui/ButtonContainer';
import { LoadingOverlay } from '$/components/ui/LoadingSpinner';

export type EmailVerificationFormProps = Record<string, never>;

export const EmailVerificationForm: VFC<EmailVerificationFormProps> = memo(() => {
  const signOut = useSignOut();
  const { error, inProgress, isComplete, submit } = useEmailVerificationForm();

  return (
    <LoadingOverlay isLoading={inProgress}>
      <Box mx={10} my={5}>
        {error && <Alert severity="error">{error}</Alert>}
        {isComplete && (
          <Alert severity="success">Please check your email for a verification message.</Alert>
        )}
        <Box my={3}>
          <Typography>
            Your email address must be verified. Please click the button below to send a
            verification email to your email address.
          </Typography>
        </Box>
        <ButtonContainer>
          <Button onClick={submit} variant="contained" color="primary">
            Send verification email
          </Button>
          <Button onClick={signOut} component={Link} color="primary">
            Back to login
          </Button>
        </ButtonContainer>
      </Box>
    </LoadingOverlay>
  );
});
