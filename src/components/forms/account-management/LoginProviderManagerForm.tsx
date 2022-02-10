import { useCallback, useMemo, useState, VFC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useFirebaseAuthContext, useUnlink } from '@sprice237/react-auth';
import { LoginProviderManagerPasswordRow } from './LoginProviderManagerPasswordRow';
import { LoginProviderManagerNonPasswordRow } from './LoginProviderManagerNonPasswordRow';

export type LoginProviderManagerProps = {
  Loading?: VFC;
  providers: ('password' | 'google' | 'microsoft' | 'facebook')[];
};

export const LoginProviderManagerForm: VFC<LoginProviderManagerProps> = ({
  Loading,
  providers,
}) => {
  const { reloadUser, user } = useFirebaseAuthContext();
  const unlink = useUnlink();

  const [isLoading, setIsLoading] = useState(false);

  const passwordProvider = useMemo(
    () => user?.providerData.find(({ providerId }) => providerId === 'password'),
    [user?.providerData]
  );

  const nonPasswordProvider = useMemo(
    () => user?.providerData.find(({ providerId }) => providerId !== 'password'),
    [user?.providerData]
  );

  const unlinkPassword = useCallback(async () => {
    if (passwordProvider) {
      try {
        setIsLoading(true);
        await unlink('password');
        await reloadUser();
      } finally {
        setIsLoading(false);
      }
    }
  }, [passwordProvider, unlink, reloadUser]);

  const unlinkNonPassword = useCallback(async () => {
    if (nonPasswordProvider) {
      try {
        setIsLoading(true);
        await unlink(nonPasswordProvider.providerId);
        await reloadUser();
      } finally {
        setIsLoading(false);
      }
    }
  }, [passwordProvider, unlink, reloadUser]);

  if (!user) {
    return null;
  }

  return (
    <>
      {isLoading && Loading && <Loading />}
      <Table>
        <TableBody>
          {providers.includes('password') && (
            <LoginProviderManagerPasswordRow
              passwordProvider={passwordProvider}
              nonPasswordProvider={nonPasswordProvider}
              onRemove={unlinkPassword}
            />
          )}
          <LoginProviderManagerNonPasswordRow
            providers={providers
              .filter((p) => p !== 'password')
              .map((p) => p as 'google' | 'microsoft' | 'facebook')}
            passwordProvider={passwordProvider}
            nonPasswordProvider={nonPasswordProvider}
            onRemove={unlinkNonPassword}
          />
        </TableBody>
      </Table>
    </>
  );
};
