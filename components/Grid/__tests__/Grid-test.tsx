import * as React from 'react';
import { render } from '@testing-library/react-native';

import { reposMock } from '@/constants/mocks';

import { Grid } from '../index';

const mockData = reposMock.slice(0, 10);

describe('Grid component', () => {
  it('Renders correctly', () => {
    const tree = render(<Grid data={mockData} onItemSelected={() => {}}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Show correct number of repos', async () => {
    const tree = render(<Grid data={mockData} onItemSelected={() => {}}/>);

    const components = await tree.findAllByTestId('grid-item');

    expect(components).toHaveLength(mockData.length);
  });
});