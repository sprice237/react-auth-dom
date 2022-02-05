import { VFC } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useSignInWithRedirect, GoogleAuthProvider, UserCredential } from '@sprice237/react-auth';

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

export type GoogleLoginButtonProps = {
  onClick?: () => void;
  onSuccess?: (result: UserCredential) => void;
  onError?: (e: Error) => void;
};

export const GoogleLoginButton: VFC<GoogleLoginButtonProps> = ({ onClick, onSuccess, onError }) => {
  const signInWithRedirect = useSignInWithRedirect();

  const handleClick = async () => {
    onClick?.call(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithRedirect(provider);
      onSuccess?.call(null, result);
    } catch (error) {
      onError?.call(null, error);
    }
  };

  return (
    <StyledButton variant="outlined" onClick={handleClick}>
      <IconWrapper>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
      </IconWrapper>
      <div>Sign in with Google</div>
    </StyledButton>
  );
};
