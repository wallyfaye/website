import React from 'react';
import Core from './index';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Core />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
