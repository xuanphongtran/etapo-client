import { RightIcon } from './icons/Icon'

const { styled } = require('styled-components')

const MenuTree = styled.div`
  position: absolute;
  left: 250px;
  top: 100%;
  width: 200px;
  background-color: #f2f2f2;
  border-radius: 4px;
  margin-top: 32px;
  background-color: #fff;
  z-index: 980;
`

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #343a40;
  padding: 4px 10px;
  text-decoration: none;
  cursor: pointer;
  svg {
    height: 12px;
  }

  &:hover {
    background-color: #f28102;
    border-radius: 4px;
  }
`
const MenuTreeChild = styled.div`
  box-shadow: 0 0.5em 1em -0.125em hsla(0, 0%, 4%, 0.1), 0 0 0 1px hsla(0, 0%, 4%, 0.02);
  position: absolute;
  top: 0;
  display: none;
  left: 100%;
  padding: 0 15px;
  background-color: #f2f2f2;
  border-radius: 4px;
  min-height: 250px;
  ${MenuItem}:hover & {
    display: flex;
  }
`
const MenuChildItem = styled.div`
  padding: 10px;
  display: block;
  max-width: 100px;
`
const Item = styled.div`
  display: block;
  color: #333;
  padding: 16px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #f28102;
    border-radius: 4px;
  }
`
const MenuWrapper = ({ items }) => {
  return (
    <MenuTree>
      {items.map((item) => (
        <MenuItem key={item.label} href={item.url}>
          {item.label}
          <RightIcon />
          <MenuTreeChild>
            {item.child.map((child, index) => (
              <MenuChildItem key={index}>
                <h3>{child.title}</h3>
                {child.content.map((childItem) => (
                  <Item key={childItem}>{childItem}</Item>
                ))}
              </MenuChildItem>
            ))}
          </MenuTreeChild>
        </MenuItem>
      ))}
    </MenuTree>
  )
}
export default MenuWrapper
