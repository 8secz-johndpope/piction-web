import styled from 'styled-components';

const Input = styled.input.attrs({
  type: 'text',
})`
  padding: 14px;
  border: 2px solid var(--gray--dark);
  background-color: var(--white);
  font-size: var(--font-size--small);
  line-height: normal;
  transition: box-shadow 200ms ease-in, border-color 200ms ease-in;

  &:focus {
    border-color: var(--black);
    outline: none;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.15);
  }

  &::placeholder {
    color: var(--gray--dark);
  }
`;

export default Input;