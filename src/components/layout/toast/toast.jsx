import * as React from 'react';
import {useEffect} from 'react';
import './toast.css';

export const Toast = (props) => {
  const {children, remove} = props;

  useEffect(() => {
    const duration = 5000;
    const id = setTimeout(remove, duration);

    return () => clearTimeout(id);
  }, [remove]);

  return (
    <div className="toast">
      <div className="toast-text">
        {children}
      </div>
      <div>
        <button onClick={remove} className="toast-close-btn">x</button>
      </div>
    </div>
  );
};
