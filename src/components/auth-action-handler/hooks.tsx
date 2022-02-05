import { useLocation } from 'react-router-dom';

type FirebaseActionParams = {
  mode: string;
  oobCode: string;
  apiKey: string;
  lang: string;
};

export const useFirebaseActionParams = (): FirebaseActionParams | null => {
  const { search } = useLocation();
  const searchObj = new URLSearchParams(search);

  const mode = searchObj.get('mode') as 'resetPassword' | 'recoverEmail' | 'verifyEmail' | null;
  const oobCode = searchObj.get('oobCode');
  const apiKey = searchObj.get('apiKey');
  const lang = searchObj.get('lang');

  if (
    !mode ||
    !['resetPassword', 'recoverEmail', 'verifyEmail'].includes(mode) ||
    !oobCode ||
    !apiKey ||
    !lang
  ) {
    return null;
  }

  return { mode, oobCode, apiKey, lang };
};
