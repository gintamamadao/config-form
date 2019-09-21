import { Input } from 'antd';
import React from 'react';

class CInput extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  onChange() {}

  render() {
    return React.createElement(Input, null);
  }

}

var index = {
  Input: CInput
};

export default index;
