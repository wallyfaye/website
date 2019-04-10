import React from 'react';
import Core from './index';
import renderer from 'react-test-renderer';

/** @test {Core} */
test('Core should render', () => {
  const component = renderer.create(
    <Core />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
