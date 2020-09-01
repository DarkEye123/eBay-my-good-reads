import React from 'react';
import styled from 'styled-components';

interface IconProps {
  onClick: () => void;
  active: boolean;
}

const Icon = styled.i.attrs<IconProps>(({ active, theme }) => ({
  color: active ? theme.color.main : theme.color.darkShades,
}))<IconProps>`
  transition: color 0.5s;
  color: ${props => props.color};
  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.main};
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

export default function (props: IconProps) {
  return <Icon {...props} className="fas fa-heart"></Icon>;
}
