import { useFormik } from 'formik';
import { memo, ReactElement, VFC } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForgotPasswordForm, ForgotPasswordFormData } from '@sprice237/react-auth';
import { ButtonContainer } from '$/components/ui/ButtonContainer';
import { LoadingOverlay } from '$/components/ui/LoadingSpinner';

const initialValues: ForgotPasswordFormData = {
  email: '',
};

export type ForgotPasswordFormProps = {
  backToLoginElement?: ReactElement;
};

export const ForgotPasswordForm: VFC<ForgotPasswordFormProps> = memo(({ backToLoginElement }) => {
  const { error, inProgress, isComplete, submit } = useForgotPasswordForm();

  const formik = useFormik<ForgotPasswordFormData>({
    initialValues,
    onSubmit: submit,
  });

  return (
    <LoadingOverlay isLoading={inProgress}>
      <form onSubmit={formik.handleSubmit}>
        <Box mx={10} my={5}>
          {error && <Alert severity="error">{error}</Alert>}
          {isComplete && (
            <Alert severity="success">
              Please check your email for a password recovery message.
            </Alert>
          )}
          <Box my={5}>
            <TextField
              name="email"
              type="email"
              label="Email Address"
              variant="standard"
              fullWidth
              required
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Box>
          <ButtonContainer>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            {backToLoginElement}
          </ButtonContainer>
        </Box>
      </form>
    </LoadingOverlay>
  );
});
