import { navbarList } from '@assets/data/navbarList'
import * as n from '@common/navbar/Navbar.styled'

const Index = (props: { current: string }) => {
  const { current } = props

  return (
    <n.Container>
      <n.Wrap>
        {navbarList.map(item => (
          <n.Item key={item.name} to={item.url}>
            <n.Icon
              src={current === item.name ? item.activeImgSrc : item.imgSrc}
              alt=""
              width={item.width}
              height={item.height}
            />
            <n.Label $active={current === item.name}>{item.label}</n.Label>
          </n.Item>
        ))}
      </n.Wrap>
    </n.Container>
  )
}

export default Index
