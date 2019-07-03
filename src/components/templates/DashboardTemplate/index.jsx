import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

import DashboardSidebar from 'components/organisms/DashboardSidebar';

const Styled = {
  Sidebar: styled(DashboardSidebar)`
    grid-column: 1 / span 3;
  `,
  Content: styled.section`
    grid-column: span 9;
  `,
};

function DashboardTemplate({ projects, children }) {
  return (
    <MainGrid as="main" role="main">
      <Styled.Sidebar projects={projects} />
      <Styled.Content>
        {children}
      </Styled.Content>
    </MainGrid>
  );
}

DashboardTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  projects: PropTypes.array.isRequired,
};

export default DashboardTemplate;
