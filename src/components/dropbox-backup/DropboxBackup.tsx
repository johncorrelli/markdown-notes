import {useState} from 'react';
import {Dropbox, DropboxAuth} from 'dropbox';
import type {Note} from '../../types';
import './dropbox-backup.scss';

const DROPBOX_CLIENT_ID = 'tc24qpb201s456w';

type Props = {
  notes: Note[];
};

const getAccessToken = () => {
  const accessToken = sessionStorage.getItem('dropbox_access_token');
  if (accessToken) {
    return accessToken;
  }

  const matches = window.location.hash.match(/access_token=(.+?)&/);
  if (matches && matches[1]) {
    sessionStorage.setItem('dropbox_access_token', matches[1]);
    return matches[1];
  }

  return null;
};

const getAuthUrl = async () => {
  const auth = new DropboxAuth({clientId: DROPBOX_CLIENT_ID});
  // 'token' keeps the original implicit-grant flow: Dropbox redirects back
  // with the access token in the URL hash, which getAccessToken() reads.
  const url = await auth.getAuthenticationUrl(
    window.location.href,
    undefined,
    'token'
  );
  return String(url);
};

const DropboxBackup = ({notes}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const backup = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      window.location.assign(await getAuthUrl());
      return;
    }

    setIsLoading(true);

    const dbx = new Dropbox({accessToken});
    dbx
      .filesUpload({
        contents: new Blob([JSON.stringify(notes)], {
          type: 'text/plain',
        }),
        path: '/backup.json',
        mode: {
          '.tag': 'overwrite',
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button
      className="dropbox-backup secondary-button"
      onClick={backup}
      title="Backup to Dropbox"
    >
      <span className={`dropbox-logo ${isLoading ? 'loading' : ''}`} />
    </button>
  );
};

export default DropboxBackup;
