import React from 'react'
import {BlockStyleProps} from 'sanity'

const Overline = (props: BlockStyleProps) => {
  return (
    <span
      style={{
        fontFamily: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Liberation Sans", Helvetica, Arial, system-ui, sans-serif`,
        margin: 0,
        fontSize: '.875em',
        fontWeight: 600,
        color: '#383d51',
        backgroundColor: 'oklch(0.94 0 0)',
        padding: '6px 16px',
        borderRadius: '100px',
      }}
    >
      {props.children}
    </span>
  )
}

export default Overline
