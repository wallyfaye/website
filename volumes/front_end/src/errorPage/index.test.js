import React from 'react';
import ErrorPage from './index';
import renderer from 'react-test-renderer';

/** @test {ErrorPage} */
test('ErrorPage should render', () => {
  const component = renderer.create(
    <ErrorPage />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
