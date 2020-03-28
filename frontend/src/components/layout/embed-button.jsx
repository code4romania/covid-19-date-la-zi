import * as React from 'react';
import './embed-button.css';
import {useToast} from './toast/withToastProvider';

export const EmbedButton = (props) => {
  const toast = useToast();
  const {path, viewPort} = props;

  const handleCopyEmbedCode = () => {
    const result = `<iframe
            src="${window.location.origin.toString()}/embed/${path}"
            width="${viewPort.width}"
            height="${viewPort.height}" />`;

    navigator.clipboard.writeText(result).then(() => toast.add('Textul a fost copiat in memoria clipboard'));
  };

  return (
    <div className="fab-action">
      <div className="tooltip">
        <img src="/images/favicon/embed.png" alt="embed" className="fab-icon" onClick={handleCopyEmbedCode} />
      </div>
    </div>
  );
};
