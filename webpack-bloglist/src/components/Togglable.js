import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'semantic-ui-react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <Button primary onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button secondary onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
