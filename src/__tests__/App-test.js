import 'react-native';
import React from 'react';
import App from '../App';
import AddScreeen from '../screens/AddScreen';
import ViewScreen from '../screens/ViewScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<App skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the AddScreeen', async () => {
    const tree = renderer.create(<AddScreeen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the ViewScreen', async () => {
    const tree = renderer.create(<ViewScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
