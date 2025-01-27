import * as React from 'react';
import { render } from '@testing-library/react-native';

import { reposContentMock } from '@/constants/mocks';

import { Files } from '../index';

const mockData = reposContentMock.slice(0, 10);

describe('Files component', () => {
  it('Renders correctly', () => {
    const tree = render(<Files data={mockData} onItemSelected={() => {}}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should show correct number of items', async () => {
    const tree = render(<Files data={mockData} onItemSelected={() => {}}/>);

    const components = await tree.findAllByTestId('files-item');

    expect(components).toHaveLength(mockData.length);
  });
});