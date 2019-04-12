import React from 'react';
import Loading from './index';
import renderer from 'react-test-renderer';

/** @test {Loading} */
test('Loading should render', () => {
  const component = renderer.create(
    <Loading />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
