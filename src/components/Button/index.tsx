import styled from 'styled-components';

interface ButtonProps {
  size?: 'small' | 'normal' | 'large';
  outlined?: boolean;
  color?: 'primary' | 'secondary';
  loading?: boolean;
}

const Button = styled.button`
  padding: 0 0.75rem 0 0.75rem;
  height: 2rem;
  outline: none;
  border-width: 0px;
  line-height: 2rem;
  align-self: center;
  font-family: 'Roboto', sans-serif;
  background-color: transparent;
  border-color: white;
  color: ${({ theme }) => theme.color.main};
  white-space: nowrap;
  letter-spacing: 0px;
  text-shadow: 0 0;
  transition: all 0.2s;
  transition-property: text-shadow, letter-spacing;
  :disabled {
    opacity: 0.7;
    box-shadow: 0 0px #666;
  }
  :active {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0;
    transition: box-shadow 0.1s;
  }
  :hover:enabled {
    cursor: pointer;
  }
  :enabled:hover {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.5px;
  }
`;

export default Button;
