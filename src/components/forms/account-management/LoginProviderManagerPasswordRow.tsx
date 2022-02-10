import { useState, VFC } from 'react';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FirebaseUser } from '@sprice237/react-auth';
import { LinkPasswordAuthProviderModal } from './LinkPasswordAuthProviderModal';

export type LoginProviderManagerPasswordRowProps = {
  passwordProvider: FirebaseUser['providerData'][0] | undefined;
  nonPasswordProvider: FirebaseUser['providerData'][0] | undefined;
  onRemove: () => void;
};

export const LoginProviderManagerPasswordRow: VFC<LoginProviderManagerPasswordRowProps> = ({
  passwordProvider,
  nonPasswordProvider,
  onRemove,
}) => {
  const [isLinkPasswordAuthProviderModalVisible, setIsLinkPasswordAuthProviderModalVisible] =
    useState(false);

  return (
    <>
      {isLinkPasswordAuthProviderModalVisible && (
        <LinkPasswordAuthProviderModal
          onComplete={() => setIsLinkPasswordAuthProviderModalVisible(false)}
          onCancel={() => setIsLinkPasswordAuthProviderModalVisible(false)}
        />
      )}
      <TableRow>
        <TableCell>Password</TableCell>
        <TableCell>
          {passwordProvider && nonPasswordProvider && (
            <Button onClick={onRemove} variant="contained" color="primary">
              Remove password
            </Button>
          )}
          {passwordProvider && !nonPasswordProvider && (
            <p>Cannot remove without an alternate login method</p>
          )}
          {!passwordProvider && (
            <Button
              onClick={() => setIsLinkPasswordAuthProviderModalVisible(true)}
              variant="contained"
              color="primary"
            >
              Add password
            </Button>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
