import React from 'react'

interface MenuIconProps {
  color: string
}

const MenuIcon: React.FC<MenuIconProps> = ({ color }) => {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" width="14" height="2" fill={color} />
      <rect x="2" y="4" width="14" height="2" fill={color} />
      <rect y="8" width="14" height="2" fill={color} />
    </svg>
  )
}
export default MenuIcon
