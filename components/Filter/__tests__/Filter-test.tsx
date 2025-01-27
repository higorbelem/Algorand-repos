import * as React from 'react';
import { render } from '@testing-library/react-native';

import { Filter } from '../index';

const mockData = [{id: 'perawallet', label: 'Pera Wallet'}, {id: 'algorandfoundation', label: 'Algorand Foundation'}, {id: 'algorand', label: 'Algorand'}];

describe('Filter component', () => {
  it('Renders correctly', () => {
    const tree = render(<Filter data={mockData} onItemSelected={() => {}}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Show correct number of items', async () => {
    const tree = render(<Filter data={mockData} onItemSelected={() => {}}/>);

    const components = await tree.findAllByTestId('filter-item');

    expect(components).toHaveLength(mockData.length + 1);
  });

  it('Show "All" item', async () => {
    const tree = render(<Filter data={mockData} onItemSelected={() => {}}/>);

    const component = tree.getByText('All');

    expect(component).toBeTruthy();
  });
});