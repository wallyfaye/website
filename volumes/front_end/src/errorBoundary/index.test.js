import React, { Component } from 'react';
import ErrorBoundary from './index';
import renderer from 'react-test-renderer';

class ErrorComponent extends Component {
  render() {
    throw new Error('ErrorComponent throws error')
    return <div>ErrorComponent</div>
  }
}

/** @test {ErrorBoundary} */
test('ErrorBoundary should render', () => {
  const component = renderer.create(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
