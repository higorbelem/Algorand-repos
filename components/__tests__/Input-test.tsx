import * as React from 'react';
import { render } from '@testing-library/react-native';

import { Colors } from '@/constants/Colors';

import { Input } from '../Input';

describe('Input component', () => {
  it('Renders correctly', () => {
    const tree = render(<Input />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Shows correct placeholder', async () => {
    const tree = render(<Input placeholder='placeholder'/>);

    expect(await tree.findByPlaceholderText('placeholder')).toBeTruthy();
  });
  
    it('Has correct color', async () => {
      const tree = render(<Input placeholder='placeholder'/>);
      
      const component = await tree.findByTestId('input-component');
  
      expect(component).toHaveStyle({color: Colors.text});
    });
});