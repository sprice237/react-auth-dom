import { useFormik } from 'formik';
import { memo, VFC } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { PasswordLoginFormData } from '@sprice237/react-auth';
import { ButtonContainer } from '$/components/ui/ButtonContainer';

const initialValues: PasswordLoginFormData = {
  email: '',
  password: '',
};

export type PasswordLoginFormProps = {
  error: string | undefined;
  onSubmit: (formData: PasswordLoginFormData) => Promise<void>;
};

export const PasswordLoginForm: VFC<PasswordLoginFormProps> = memo(({ error, onSubmit }) => {
  const formik = useFormik<PasswordLoginFormData>({
    initialValues,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}
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
      <ButtonContainer>
        <Button type="submit" variant="contained" color="primary">
          Sign in
        </Button>
      </ButtonContainer>
    </form>
  );
});
