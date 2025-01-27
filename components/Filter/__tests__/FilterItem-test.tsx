import * as React from 'react';
import { render } from '@testing-library/react-native';

import { Colors } from '@/constants/Colors';

import { FilterItem } from '../FilterItem';

const mockData = {id: 'perawallet', label: 'Pera Wallet'};

describe('FilterItem component', () => {
  it('Renders correctly', () => {
    const tree = render(<FilterItem {...mockData} selected onPress={() => {}}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should show correct text', () => {
    const tree = render(<FilterItem {...mockData} selected onPress={() => {}}/>);

    const component = tree.getByText(mockData.label);

    expect(component).toBeTruthy();
  });

  it('Should change background if selected', () => {
    const tree = render(<FilterItem {...mockData} selected onPress={() => {}}/>);

    const component = tree.getByTestId("filter-item");

    expect(component).toHaveStyle({ backgroundColor: Colors.main });
  });

  it('Should change background if not selected', () => {
    const tree = render(<FilterItem {...mockData} selected={false} onPress={() => {}}/>);

    const component = tree.getByTestId("filter-item");

    expect(component).toHaveStyle({ backgroundColor: '#ffffff22' });
  });
});