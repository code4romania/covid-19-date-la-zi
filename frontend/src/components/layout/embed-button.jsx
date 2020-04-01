import * as React from 'react';
import './embed-button.css';
import {useToast} from './toast/withToastProvider';

export const EmbedButton = (props) => {
  const toast = useToast();
  const {path, viewPort} = props;

  console.log(window.location);

  const footerHeight = 75;
  let getEmbeddableCode = () => `<iframe
            scrolling="no"
            src="${window.location.origin.toString()}/embed/${path}"
            width="${viewPort.width}"
            height="${viewPort.height + footerHeight}" />`;

  const handleCopyEmbedCode = () => {
    const auxiliaryField = document.createElement('textarea');
    auxiliaryField.innerText = getEmbeddableCode();

    document.body.appendChild(auxiliaryField);
    auxiliaryField.select();
    document.execCommand('copy');

    auxiliaryField.remove();

    toast.add('Textul a fost copiat in memoria clipboard')
  };

  // if already embedded hide the button
  if (window.location.pathname === `/embed/${path}`) {
    return (<span />);
  }

  return (
    <div className="fab-action">
      <div className="tooltip">
        <img src="/images/favicon/embed.png" alt="embed" className="fab-icon" onClick={handleCopyEmbedCode} />
      </div>
    </div>
  );
};
