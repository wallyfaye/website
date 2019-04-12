import React from 'react';
import ErrorBoundary from './index';
import renderer from 'react-test-renderer';

/** @test {ErrorBoundary} */
test('ErrorBoundary should render', () => {
  const component = renderer.create(
    <ErrorBoundary />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
