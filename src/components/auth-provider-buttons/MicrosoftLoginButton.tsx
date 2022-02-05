import { VFC } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import {
  useSignInWithRedirect,
  MicrosoftAuthProvider,
  UserCredential,
} from '@sprice237/react-auth';

const StyledButton = styled(Button)`
  width: 250px;
  height: 50px;
  display: flex;
  flex-direction: row;
`;

const IconWrapper = styled.div`
  margin: 5px 10px 5px 0;

  height: 24px;
  width: 24px;

  & img {
    height: 100%;
    width: 100%;
  }
`;

export type MicrosoftLoginButtonProps = {
  onClick?: () => void;
  onSuccess?: (result: UserCredential) => void;
  onError?: (e: Error) => void;
};

export const MicrosoftLoginButton: VFC<MicrosoftLoginButtonProps> = ({
  onClick,
  onSuccess,
  onError,
}) => {
  const signInWithRedirect = useSignInWithRedirect();

  const handleClick = async () => {
    onClick?.call(null);
    try {
      const provider = new MicrosoftAuthProvider();
      const result = await signInWithRedirect(provider);
      console.log('result', result);
      onSuccess?.call(null, result);
    } catch (error) {
      onError?.call(null, error);
    }
  };

  return (
    <StyledButton variant="outlined" onClick={handleClick}>
      <IconWrapper>
        <img src="https://docs.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-azure-ad-apps/ms-symbollockup_mssymbol_19.svg" />
      </IconWrapper>
      <div>Sign in with Microsoft</div>
    </StyledButton>
  );
};
