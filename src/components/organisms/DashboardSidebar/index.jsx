import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Location, Link } from '@reach/router';

import useCurrentUser from 'hooks/useCurrentUser';

import media from 'styles/media';

import { TertiaryButton } from 'components/atoms/Button';

import { ReactComponent as ExpandIcon } from 'images/ic-expand-more.svg';
import { ReactComponent as OpenInNewIcon } from 'images/ic-open-in-new.svg';

const Styled = {
  Sidebar: styled.section`
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: var(--gray--light);
  `,
  Header: styled.header`
    padding: 24px;
    background-color: var(--primary-color);
    color: var(--white);
    font-weight: bold;
  `,
  Title: styled.h2`
    margin-top: 4px;
    font-size: var(--font-size--normal);
  `,
  Name: styled.p`
    font-size: var(--font-size--small);
  `,
  Project: styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-top: 1px solid rgba(0, 0, 0, .05);
    cursor: pointer;
    text-align: left;
     > svg {
      margin-left: 8px;
      flex: 0 0 auto;
     }
    &[aria-current] {
      padding-left: 22px;
      border-left: 2px solid var(--primary-color);
      background-color: var(--white);
      font-weight: bold;
      > svg {
        transform: rotate(180deg);
      }
    }
  `,
  ProjectTitle: styled.span`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  Link: styled(Link)`
    display: flex;
    padding: 12px 40px;
    color: var(--gray--dark);
    align-items: center;
    &[aria-current] {
      color: var(--black);
    }
    svg {
      margin-left: 4px;
    }
  `,
  Button: styled(TertiaryButton)`
    ${media.mobile`
      display: none;
    `}
    margin: 24px;
    text-align: center;
  `,
};

const isPartiallyActive = ({
  isPartiallyCurrent,
}) => (isPartiallyCurrent
  ? { 'aria-current': 'page' } : null
);

function DashboardSidebar({ projects, ...props }) {
  const { currentUser } = useCurrentUser();

  return (
    <Styled.Sidebar {...props}>
      <Styled.Header>
        <Styled.Name>{`${currentUser.username}의`}</Styled.Name>
        <Styled.Title>크리에이터 대시보드</Styled.Title>
      </Styled.Header>
      <Location>
        {({ location }) => (
          projects.map(project => (
            <React.Fragment key={project.uri}>
              <Styled.Project
                getProps={isPartiallyActive}
                to={`/dashboard/${project.uri}/`}
              >
                <Styled.ProjectTitle>
                  {project.title}
                </Styled.ProjectTitle>
                <ExpandIcon />
              </Styled.Project>
              {location.pathname.includes(`/${project.uri}/`) && (
                <>
                  <Styled.Link
                    getProps={isPartiallyActive}
                    to={`/dashboard/${project.uri}/posts`}
                  >
                    포스트 관리
                  </Styled.Link>
                  <Styled.Link to={`/dashboard/${project.uri}/series`}>시리즈 관리</Styled.Link>
                  <Styled.Link to={`/dashboard/${project.uri}/members`}>구독자 목록</Styled.Link>
                  <Styled.Link to={`/dashboard/${project.uri}/info`}>프로젝트 정보 수정</Styled.Link>
                  <Styled.Link as="a" target="_blank" href={`/project/${project.uri}`}>
                    프로젝트로 이동
                    <OpenInNewIcon />
                  </Styled.Link>
                </>
              )}
            </React.Fragment>
          ))
        )}
      </Location>
      <Styled.Button as={Link} to="new-project">
        새 프로젝트 만들기
      </Styled.Button>
    </Styled.Sidebar>
  );
}

DashboardSidebar.propTypes = {
  projects: PropTypes.array.isRequired,
};

export default DashboardSidebar;
