import styled, { keyframes } from 'styled-components'
import Button from '../Common/Button'

const oscillate = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`
const NotifyImage = styled.div`
  background-image: url('https://res.cloudinary.com/danr1pj0e/image/upload/v1696658905/rev_home2_ikdlac.png');
  height: 165px;
  width: 228px;
  position: absolute;
  right: 5%;
  top: 5%;
  animation: ${oscillate} 2s infinite;
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
  background-color: rgb(250, 215, 183);
  color: rgb(255, 255, 255);
  width: 882px;
  height: 400px;
  border-top-right-radius: 500px;
  border-top-left-radius: 445px;
  transform-origin: 50% 50%;
  opacity: 1;
  transform: translate(0px, 0px);
  visibility: visible;
  position: absolute;
  right: 100px;
  bottom: 0;
`
const ImageContainer = styled.img`
  position: absolute;
  right: 140px;
  bottom: 20px;
`
const LayerContainer = styled.img`
  position: absolute;
  right: 110px;
  bottom: 70px;
`
const Content = styled.div`
  height: 200px;
  max-width: 30%;
  position: absolute;
  left: 100px;
  top: 25%;
  color: #000000;
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
const Home3 = () => {
  return (
    <>
      <Content>
        <Head>GIẢM GIÁ 10%</Head>
        <Title>Những thức ăn tốt nhất cho thú cưng của bạn</Title>
        <Bottom>Giúp thú cưng của bạn duy trì cân nặng khỏe mạnh hơn !</Bottom>
        <Button primary $padding="15px 25px" $fontSize="25px" $width="200px">
          Mua ngay
        </Button>
      </Content>
      <Layer>
        <LayerContainer src="https://res.cloudinary.com/danr1pj0e/image/upload/v1697278705/rev_home2_2_ym01p2.png" />
        <ImageContainer src="https://res.cloudinary.com/danr1pj0e/image/upload/v1696658886/home3_srfrlf.png" />
      </Layer>
      <NotifyImage>
        <div>
          <span>100%</span> Thức ăn vật nuôi hữu cơ
        </div>
      </NotifyImage>
    </>
  )
}
export default Home3
