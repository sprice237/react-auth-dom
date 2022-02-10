import { Fragment, VFC } from 'react';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FirebaseUser } from '@sprice237/react-auth';
import { GoogleLoginButton } from '$/components/auth-provider-buttons/GoogleLoginButton';
import { MicrosoftLoginButton } from '$/components/auth-provider-buttons/MicrosoftLoginButton';
import { FacebookLoginButton } from '$/components/auth-provider-buttons/FacebookLoginButton';
import styled from 'styled-components';

const getNiceProviderName = (providerId: string) => {
  switch (providerId) {
    case 'google.com':
      return 'Google';
    case 'microsoft.com':
      return 'Microsoft';
    case 'facebook.com':
      return 'Facebook';
    default:
      return '';
  }
};

const ProviderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export type LoginProviderManagerNonPasswordRowProps = {
  providers: ('google' | 'microsoft' | 'facebook')[];
  passwordProvider: FirebaseUser['providerData'][0] | undefined;
  nonPasswordProvider: FirebaseUser['providerData'][0] | undefined;
  onRemove: () => void;
};

export const LoginProviderManagerNonPasswordRow: VFC<LoginProviderManagerNonPasswordRowProps> = ({
  providers,
  passwordProvider,
  nonPasswordProvider,
  onRemove,
}) => {
  if (!providers.length) {
    return null;
  }

  if (nonPasswordProvider) {
    return (
      <TableRow>
        <TableCell>{getNiceProviderName(nonPasswordProvider.providerId)}</TableCell>
        <TableCell>
          {!passwordProvider && <p>Cannot remove without setting a password</p>}
          {passwordProvider && (
            <Button onClick={onRemove} variant="contained" color="primary">
              Remove {getNiceProviderName(nonPasswordProvider.providerId)} account
            </Button>
          )}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell />
      <TableCell>
        <ProviderContainer>
          {providers.map((providerId) => (
            <Fragment key={providerId}>
              {providerId === 'google' && <GoogleLoginButton />}
              {providerId === 'microsoft' && <MicrosoftLoginButton />}
              {providerId === 'facebook' && <FacebookLoginButton />}
            </Fragment>
          ))}
        </ProviderContainer>
      </TableCell>
    </TableRow>
  );
};
