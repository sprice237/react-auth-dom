import { useFormik } from 'formik';
import { memo, VFC } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ChangePasswordFormData } from '@sprice237/react-auth';
import { ButtonContainer } from '$/components/ui/ButtonContainer';

const initialValues: ChangePasswordFormData = {
  currentPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export type ChangePasswordFormProps = {
  error: string | undefined;
  onCancel: () => void;
  onSubmit: (formData: ChangePasswordFormData) => Promise<void>;
};

export const ChangePasswordForm: VFC<ChangePasswordFormProps> = memo(
  ({ error, onCancel, onSubmit }) => {
    const formik = useFormik<ChangePasswordFormData>({
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
            name="currentPassword"
            type="password"
            label="Current password"
            variant="standard"
            fullWidth
            required
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
          />
        </Box>
        <Box my={3}>
          <TextField
            name="newPassword"
            type="password"
            label="New password"
            variant="standard"
            fullWidth
            required
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
        </Box>
        <Box my={3}>
          <TextField
            name="newPasswordConfirm"
            type="password"
            label="Confirm new password"
            variant="standard"
            fullWidth
            required
            value={formik.values.newPasswordConfirm}
            onChange={formik.handleChange}
          />
        </Box>
        <ButtonContainer>
          <Button type="button" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </ButtonContainer>
      </form>
    );
  }
);
