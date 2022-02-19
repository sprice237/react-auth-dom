import { useFormik } from 'formik';
import { memo, ReactElement, VFC } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { usePasswordResetForm, PasswordResetFormData } from '@sprice237/react-auth';
import { ButtonContainer } from '$/components/ui/ButtonContainer';
import { LoadingOverlay } from '$/components/ui/LoadingSpinner';

const initialValues: PasswordResetFormData = {
  password: '',
  passwordConfirm: '',
};

export type PasswordResetFormProps = {
  backToLoginElement?: ReactElement;
  oobCode: string;
};

export const PasswordResetForm: VFC<PasswordResetFormProps> = memo(
  ({ backToLoginElement, oobCode }) => {
    const { error, inProgress, submit } = usePasswordResetForm(oobCode);

    const formik = useFormik<PasswordResetFormData>({
      initialValues,
      onSubmit: submit,
    });

    return (
      <LoadingOverlay isLoading={inProgress}>
        <form onSubmit={formik.handleSubmit}>
          <Box mx={10} my={5}>
            {error && <Alert severity="error">{error}</Alert>}
            <Box my={3}>
              <TextField
                name="password"
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                required
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Box>
            <Box my={3}>
              <TextField
                name="passwordConfirm"
                type="password"
                label="Confirm password"
                variant="standard"
                fullWidth
                required
                value={formik.values.passwordConfirm}
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
  }
);
