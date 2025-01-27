import * as React from 'react';
import { render } from '@testing-library/react-native';

import { reposMock } from '@/constants/mocks';

import { GridItem } from '../GridItem';

const mock = reposMock[0];

describe('GridItem component', () => {
  it('Renders correctly', () => {
    const tree = render(<GridItem {...mock} onPress={() => {}}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should show correct name', () => {
    const tree = render(<GridItem {...mock} onPress={() => {}}/>);

    const component = tree.getByText(mock.name);

    expect(component).toBeTruthy();
  });

  it('Should show correct description', () => {
    const tree = render(<GridItem {...mock} onPress={() => {}}/>);

    const component = tree.getByText(mock.description || '');

    expect(component).toBeTruthy();
  });

  it('Should show if private', () => {
    const tree = render(<GridItem {...mock} private={true} onPress={() => {}}/>);

    const component = tree.getByText('Private');

    expect(component).toBeTruthy();
  });

  it('Should show if public', () => {
    const tree = render(<GridItem {...mock} private={false} onPress={() => {}}/>);

    const component = tree.getByText('Public');

    expect(component).toBeTruthy();
  });

  it('Should show correct language', () => {
    const tree = render(<GridItem {...mock} onPress={() => {}}/>);

    const component = tree.getByText(mock.language || '');

    expect(component).toBeTruthy();
  });
});