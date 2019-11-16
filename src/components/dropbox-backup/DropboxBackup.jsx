// @flow
import React, {useState} from 'react';
import {Dropbox} from 'dropbox';
import './dropbox-backup.scss';

type Props = {
  notes: Array<Object>,
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

const getAuthUrl = () => {
  const dbx = new Dropbox({clientId: 'd41ntwo8ou6exgf', fetch});
  return dbx.getAuthenticationUrl(window.location.href);
};

const DropboxBackup = ({notes}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const backup = () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      window.location = getAuthUrl();
      return;
    }

    setIsLoading(true);

    const dbx = new Dropbox({accessToken, fetch});
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
