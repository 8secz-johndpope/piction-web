import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import useAPI from 'hooks/useAPI';

import ContentStyle from 'styles/ContentStyle';

import { ReactComponent as BoldIcon } from 'images/ic-bold.svg';
import { ReactComponent as ItalicIcon } from 'images/ic-italic.svg';
import { ReactComponent as UnderlineIcon } from 'images/ic-underline.svg';
import { ReactComponent as LinkIcon } from 'images/ic-link.svg';
import { ReactComponent as AlignLeftIcon } from 'images/ic-align-left.svg';
import { ReactComponent as AlignCenterIcon } from 'images/ic-align-center.svg';
import { ReactComponent as AlignRightIcon } from 'images/ic-align-right.svg';
import { ReactComponent as ImageIcon } from 'images/ic-image.svg';
import { ReactComponent as ImagegroupIcon } from 'images/ic-imagegroup.svg';

import './formats';

const Styled = {
  Editor: styled.div`
    border: 2px solid var(--gray--dark);
  `,
  Toolbar: styled.div`
    display: flex;
    background-color: var(--gray--light);
    border-bottom: 2px solid var(--gray--dark);
  `,
  Button: styled.button`
    display: flex;
    padding: 12px;
    color: rgba(0, 0, 0, .5);
    cursor: pointer;

    &:focus {
      outline: none;
      background-color: rgba(26, 146, 255, .3);
    }

    &.ql-active {
      background-color: rgba(26, 146, 255, .3);
      color: var(--blue);
    }

    svg path[fill] {
      fill: currentColor;
    }
  `,
  ReactQuill: styled(ReactQuill)`
    ${ContentStyle}

    .ql-editor {
      padding: 24px;

      &.ql-blank::before {
        content: attr(data-placeholder);
        position: absolute;
        color: var(--gray--dark);
        pointer-events: none;
      }
    }

    .ql-clipboard {
      left: -100%;
      height: 1px;
      overflow-y: hidden;
      position: absolute;
      top: 50%;
    }
  `,
};

function Editor({ projectId }) {
  const quillRef = useRef(null);
  const [API] = useAPI();

  function imageHandler() {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const data = new FormData();
      data.append('file', file);
      try {
        const response = await API.post(projectId).uploadContentImage(data);
        quill.insertEmbed(range.index, 'image', response.data.url);
      } catch (error) {
        console.log(error);
      }
    };
  }

  const quillProps = {
    modules: {
      toolbar: {
        container: '#toolbar',
        handlers: {
          image: imageHandler,
        },
      },
    },
    formats: ['bold', 'italic', 'underline', 'link', 'align', 'image'],
    theme: null,
    placeholder: '포스트 내용을 입력해주세요.',
  };

  return (
    <Styled.Editor>
      <Styled.Toolbar id="toolbar">
        <Styled.Button className="ql-bold">
          <BoldIcon />
        </Styled.Button>
        <Styled.Button className="ql-italic">
          <ItalicIcon />
        </Styled.Button>
        <Styled.Button className="ql-underline">
          <UnderlineIcon />
        </Styled.Button>
        <Styled.Button className="ql-link">
          <LinkIcon />
        </Styled.Button>
        <Styled.Button className="ql-align" value="">
          <AlignLeftIcon />
        </Styled.Button>
        <Styled.Button className="ql-align" value="center">
          <AlignCenterIcon />
        </Styled.Button>
        <Styled.Button className="ql-align" value="right">
          <AlignRightIcon />
        </Styled.Button>
        <Styled.Button className="ql-image">
          <ImageIcon />
        </Styled.Button>
        <Styled.Button className="ql-image">
          <ImagegroupIcon />
        </Styled.Button>
      </Styled.Toolbar>
      <Styled.ReactQuill
        ref={quillRef}
        {...quillProps}
      />
    </Styled.Editor>
  );
}

Editor.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default Editor;