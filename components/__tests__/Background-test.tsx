import * as React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

import { Background } from '../Background';

describe('Background component', () => {
  it('Renders correctly', () => {
    const tree = render(<Background />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should show children', async () => {
    const tree = render(<Background><View testID='children-view'/></Background>);
    
    const component = tree.getAllByTestId('children-view');

    expect(component).toBeTruthy();
  });
});