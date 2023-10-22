import styled from 'styled-components'
import Button from '../Common/Button'
import { bounce, fadeIn, fadeInFromLeft, oscillate, rotate, slideUp } from '@/lib/animation'

const NotifyImage = styled.div`
  background-image: url('https://res.cloudinary.com/danr1pj0e/image/upload/v1696658905/rev_home2_ikdlac.png');
  height: 165px;
  width: 228px;
  position: absolute;
  right: 5%;
  top: 5%;
  animation: ${oscillate} 2s infinite, ${fadeIn} 1s ease-in-out;
  color: #ff782c;
  font-weight: 700;
  font-size: 20px;
  & > div {
    padding: 45px 30px 0 70px;
    & > span {
      margin: 0 20px;
    }
  }
`
const Layer = styled.div`
  z-index: 17;
  background-color: rgb(92, 190, 251);
  color: rgb(255, 255, 255);
  width: 938px;
  height: 450px;
  border-top-right-radius: 500px;
  border-top-left-radius: 445px;
  transform-origin: 50% 50%;
  opacity: 1;
  transform: translate(0px, 0px);
  visibility: visible;
  position: absolute;
  right: 100px;
  bottom: 0;
  animation: ${fadeIn} 1s ease-in-out, ${slideUp} 1s ease-in-out;
`
const ImageContainer = styled.img`
  position: absolute;
  right: 200px;
  bottom: 0;
  animation: ${fadeIn} 1s ease-in-out, ${slideUp} 1s ease-in-out, ${bounce} 2s ease-in-out infinite;
`
const Content = styled.div`
  height: 200px;
  max-width: 40%;
  position: absolute;
  left: 100px;
  top: 25%;
  color: #000000;
  animation: ${oscillate} 2s infinite, ${fadeInFromLeft} 1s ease-in-out;
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
const Home1 = () => {
  return (
    <>
      <Content>
        <Head>MIỄN PHÍ VẬN CHUYỂN</Head>
        <Title>Đồ Chơi Cho Chó Cực Kỳ Bền</Title>
        <Bottom>Đồ gì cũng có !</Bottom>
        <Button $purple $padding="15px 25px" $fontSize="25px" $width="200px">
          Mua ngay
        </Button>
      </Content>
      <Layer>
        <ImageContainer src="https://res.cloudinary.com/danr1pj0e/image/upload/v1696658890/home1_rgaq3k.png" />
      </Layer>
      <NotifyImage>
        <div>
          <span>100%</span> Thức ăn vật nuôi hữu cơ
        </div>
      </NotifyImage>
    </>
  )
}
export default Home1
