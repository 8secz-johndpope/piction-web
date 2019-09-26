import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

const Styled = {
  Main: styled.main.attrs({
    role: 'main',
  })`
    display: flex;
    flex: 1;
    flex-flow: column;
  `,
};

const GridTemplate = forwardRef(({ hero, children }, ref) => (
  <Styled.Main>
    {hero}
    <MainGrid ref={ref}>
      {children}
    </MainGrid>
  </Styled.Main>
));

GridTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  hero: PropTypes.node,
};

GridTemplate.defaultProps = {
  hero: null,
};

export default GridTemplate;
