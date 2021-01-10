import * as React from 'react';
import './embed-button.css';
import Embed from './../../../images/embed.svg';
import { useToast } from '../toast/withToastProvider';

export const EmbedButton = (props) => {
  const toast = useToast();
  const { path, viewPort } = props;

  const footerHeight = 75;
  const getEmbeddableCode = `<iframe
            scrolling="no"
            src="${window.location.origin.toString()}/embed/${path}"
            width="${viewPort.width}"
            height="${viewPort.height + footerHeight}"></iframe>`;

  const handleCopyEmbedCode = () => {
    const auxiliaryField = document.createElement('textarea');
    auxiliaryField.innerText = getEmbeddableCode.replace(/\s+(?=\s)/g, '');

    document.body.appendChild(auxiliaryField);
    auxiliaryField.select();
    document.execCommand('copy');

    auxiliaryField.remove();

    toast.add('Codul de embed a fost copiat în clipboard');
  };

  // if already embedded hide the button
  if (window.location.pathname === `/embed/${path}`) {
    return <span />;
  }

  return (
    <div className="fab-action">
      <div className="tooltip">
        <img
          src={Embed}
          alt="embed"
          width="16"
          height="16"
          className="fab-icon"
          onClick={handleCopyEmbedCode}
        />
      </div>
    </div>
  );
};
