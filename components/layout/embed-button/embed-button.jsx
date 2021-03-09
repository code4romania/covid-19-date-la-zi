import React from 'react';
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast';
import styles from './embed-button.module.css';
import {Constants} from '../../../config/globals'

export const EmbedButton = (props) => {
  const { path } = props;

  const getEmbeddableCode = `<iframe
            scrolling="no"
            src="${Constants.shareableLink}/embed/${path}"
            width="311"
            height="752"></iframe>`;

  const handleCopyEmbedCode = () => {
    const auxiliaryField = document.createElement('textarea');
    auxiliaryField.innerText = getEmbeddableCode.replace(/\s+(?=\s)/g, '');

    document.body.appendChild(auxiliaryField);
    auxiliaryField.select();
    document.execCommand('copy');

    auxiliaryField.remove();
    toast.success('Codul de embed a fost copiat în clipboard')
  };

  return (
    <div className={styles.fab_action}>
      <Image
        src="/images/embed.svg"
        alt="embed"
        width={16}
        height={16}
        layout="fixed"
        onClick={handleCopyEmbedCode}
      />
      <Toaster position="bottom-right" />
    </div>
  );
};
