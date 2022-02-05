import { useFormik } from 'formik';
import { memo, VFC } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { PasswordRegistrationFormData } from '@sprice237/react-auth';
import { ButtonContainer } from '$/components/ui/ButtonContainer';

const initialValues: PasswordRegistrationFormData = {
  email: '',
  password: '',
  passwordConfirm: '',
};

export type PasswordRegistrationFormProps = {
  error: string | undefined;
  onSubmit: (formData: PasswordRegistrationFormData) => Promise<void>;
};

export const PasswordRegistrationForm: VFC<PasswordRegistrationFormProps> = memo(
  ({ error, onSubmit }) => {
    const formik = useFormik<PasswordRegistrationFormData>({
      initialValues,
      onSubmit,
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        {error && (
          <Alert key={error} severity="error">
            {error}
          </Alert>
        )}
        <Box my={3}>
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
        </ButtonContainer>
      </form>
    );
  }
);
