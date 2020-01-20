import React from 'react'

export const Screen: React.SFC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div style={{ width: '100vw', height: '100vh', display: 'flex', ...style }}>
    {children}
  </div>
)
