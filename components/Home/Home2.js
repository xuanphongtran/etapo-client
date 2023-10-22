import styled from 'styled-components'
import Button from '../Common/Button'
import { bounce, fadeIn, fadeInFromLeft, slideUp } from '@/lib/animation'

const TopLayer = styled.div`
  z-index: 19;
  width: 341px;
  height: 271px;
  transform-origin: 50% 50%;
  opacity: 1;
  transform: translate(0px, 0px);
  visibility: visible;
  position: absolute;
  right: 0;
  top: 0;
  background-image: url('https://res.cloudinary.com/danr1pj0e/image/upload/v1697277727/rev_home7_011_zurl2m.png');
  animation: ${fadeIn} 1s ease-in-out;
`
const TopImage = styled.img`
  position: absolute;
  right: 25px;
  top: 50px;
`
const Layer = styled.div`
  z-index: 22;
  color: rgb(255, 255, 255);
  width: 949px;
  height: 520px;
  transform-origin: 50% 50%;
  opacity: 1;
  transform: translate(0px, 0px);
  visibility: visible;
  position: absolute;
  right: 120px;
  bottom: 0;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-in-out;
`
const ImageLayer = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
`
const ImageContainer = styled.img`
  position: absolute;
  right: 80px;
  bottom: -80px;
  animation: ${fadeIn} 1s ease-in-out, ${slideUp} 2s ease-in-out;
`
const Content = styled.div`
  height: 200px;
  max-width: 40%;
  position: absolute;
  left: 100px;
  top: 25%;
  color: #000000;
  animation: ${fadeInFromLeft} 1s ease-in-out;
`
const Head = styled.h3`
  color: #ff782c;
  letter-spacing: 5px;
  font-weight: 750;
  font-size: 22px;
`
const Title = styled.div`
  font-size: 60px;
  font-weight: 700;
`
const Bottom = styled.h3`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 50px;
`
const Home2 = () => {
  return (
    <>
      <Content>
        <Title>Giường dành cho mèo nuôi trong nhà</Title>
        <Bottom>Sản phẩm mà mèo yêu thích</Bottom>
        <Head>Chỉ từ 99.000 </Head>
        <Button $purple $padding="15px 25px" $fontSize="25px" $width="200px">
          Mua ngay
        </Button>
      </Content>
      <TopLayer>
        <TopImage src="https://res.cloudinary.com/danr1pj0e/image/upload/v1696658967/rev_home7_010_soyikm.png" />
      </TopLayer>
      <Layer>
        <ImageLayer src="https://res.cloudinary.com/danr1pj0e/image/upload/v1697275956/rev_home7_15_ipoevf.png" />
        <ImageContainer src="https://res.cloudinary.com/danr1pj0e/image/upload/v1696658887/home2_jkxupk.png" />
      </Layer>
    </>
  )
}
export default Home2
