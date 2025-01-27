import * as React from 'react';
import { render } from '@testing-library/react-native';

import { Header } from '../Header';

describe('Header component', () => {
  it('Renders correctly', () => {
    const tree = render(<Header/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('Back button', () => {
    it('Should be hidden by default', async () => {
      const tree = render(<Header />);
      
      const component = tree.queryByTestId('back-button');

      expect(component).toBeFalsy();
    });

    it('Should show if "showBackButton" is true', async () => {
      const tree = render(<Header showBackButton/>);
      
      const component = tree.queryByTestId('back-button');

      expect(component).toBeTruthy();
    });
  });

  describe('Explore button', () => {
    it('Should be hidden by default', async () => {
      const tree = render(<Header />);
      
      const component = tree.queryByTestId('explore-button');

      expect(component).toBeFalsy();
    });

    it('Should show if "onExplore" is set', async () => {
      const tree = render(<Header onExplore={() => {}}/>);
      
      const component = tree.queryByTestId('explore-button');

      expect(component).toBeTruthy();
    });
  });
});