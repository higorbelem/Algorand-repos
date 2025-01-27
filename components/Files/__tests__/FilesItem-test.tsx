import * as React from 'react';
import { render } from '@testing-library/react-native';

import { reposContentMock } from '@/constants/mocks';

import { FilesItem } from '../FilesItem';

const mockData = reposContentMock[0];

describe('FilesItem component', () => {
  it('Renders correctly', () => {
    const tree = render(<FilesItem {...mockData} isFirst onPress={() => {}}/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should show correct text', () => {
    const tree = render(<FilesItem {...mockData} isFirst onPress={() => {}}/>);

    const component = tree.getByText(mockData.name);

    expect(component).toBeTruthy();
  });

  it('Should show folder icon', () => {
    const tree = render(<FilesItem {...mockData} type='dir' isFirst onPress={() => {}}/>);

    const component = tree.getByTestId("files-item-folder-icon");

    expect(component).toBeTruthy();
  });

  it('Should show folder icon', () => {
    const tree = render(<FilesItem {...mockData} type='file' isFirst onPress={() => {}}/>);

    const component = tree.getByTestId("files-item-file-icon");

    expect(component).toBeTruthy();
  });
});