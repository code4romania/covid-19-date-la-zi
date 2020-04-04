import React, {useContext, useState} from 'react';
import {ToastContext} from './context';
import {createPortal} from 'react-dom';
import {Toast} from './toast';
import './toast.css';

export function withToastProvider(Component) {
  return (props) => {
    const [toasts, setToasts] = useState([]);

    const add = content => {
      const id = + Date.now();
      setToasts([...toasts, {id, content}]);
    };

    const remove = id => setToasts(toasts.filter(e => e.id !== id));

    const providerValue = {add, remove};

    const toastComponents = toasts.map(t => (
      <Toast key={t.id} remove={() => remove(t.id)}>
        {t.content}
      </Toast>
    ));

    return (
      <ToastContext.Provider value={providerValue}>
        <Component {...props} />

        {createPortal(
          <div className="toasts-wrapper">
            {toastComponents}
          </div>,
          document.body
        )}
      </ToastContext.Provider>
    );
  };
}

export function useToast() {
  const context = useContext(ToastContext);
  return { add: context.add, remove: context.remove};
}
