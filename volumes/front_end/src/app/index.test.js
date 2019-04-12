import React from 'react';
import App from './index';
import renderer from 'react-test-renderer';

/** @test {App} */
test('App should render', () => {
  const component = renderer.create(
    <App />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
