import * as React from 'react';
import { render } from '@testing-library/react-native';

import { Colors } from '@/constants/Colors';

import { Text } from '../Text';

describe('Text component', () => {
  it('Renders correctly', () => {
    const tree = render(<Text>Snapshot test!</Text>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Shows correct text', async () => {
    const tree = render(<Text>Correct text</Text>);

    expect(await tree.findByText('Correct text')).toBeTruthy();
  });

  it('Has correct color', async () => {
    const tree = render(<Text>Correct text</Text>);
    
    const component = await tree.findByText('Correct text');

    expect(component).toHaveStyle({color: Colors.text});
  });
});