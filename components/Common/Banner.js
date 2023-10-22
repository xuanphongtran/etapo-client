import React from 'react'
import styled from 'styled-components'
import ButtonLink from './ButtonLink'

const BannerContainer = styled.div`
  padding: 30px 0;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$column === 3 ? '410px 410px 410px' : props.$column === 2 ? '630px 630px' : '1fr'};
  justify-content: space-between;
`
const Content = styled.div`
  background-color: ${(props) => props.$backgroud};
  height: 300px;
  border-radius: 4px;
  overflow: hidden;
  &:nth-child(3) > :first-child {
    position: relative;
    left: -30px;
  }
`
const BgWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$backgroud});
  background-size: cover;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateX(30px);
  }
`
const ContentWrapper = styled.div`
  position: relative;
  bottom: 270px;
  left: 40px;
  height: 200px;
  width: ${(props) => props.$width || '180px'};
  font-size: ${(props) => props.$size};
  font-weight: 600;
  color: #ffffff;
  & > span {
    display: inline-block;
    margin: 30px 5px 40px 0;
    font-size: 38px;
  }
`
const SaleImage = styled.div`
  background-image: url('https://res.cloudinary.com/danr1pj0e/image/upload/v1696664386/h1-banner7_oac5j8.png');
  height: 105px;
  width: 165px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  color: #ff782c;
  margin-bottom: 20px;
`
const HotLine = styled.div`
  background-image: url('https://res.cloudinary.com/danr1pj0e/image/upload/v1696666673/h1-banner5_fcxckc.png');
  height: 70px;
  width: 200px;
  font-size: 22px;
  padding: 10px 0 0 15px;
  & > span {
    color: #fcc742;
    font-size: 14px;
  }
`

const Sale = styled.div`
  font-size: 30px;
  & > span {
    color: #fcc742;
  }
`
const Desciption = styled.div`
  position: relative;
  bottom: 270px;
  left: 60px;
  :first-child {
    font-size: 38px;
    font-weight: 700;
    color: #fff;
  }
  :last-child {
    font-size: 24px;
    font-weight: 600;
    margin-left: 30px;
  }
`
export const Banner = ({ column }) => {
  return (
    <>
      {column == 3 && (
        <BannerContainer $column={column}>
          <Content $backgroud="#A8C4D9">
            <BgWrapper $backgroud="https://res.cloudinary.com/danr1pj0e/image/upload/v1696661096/h1-banner1_k5lw8m.jpg" />
            <ContentWrapper $size="26px">
              <SaleImage>Giảm 50%</SaleImage>
              Thức ăn & Phụ kiện cho thú cưng
            </ContentWrapper>
          </Content>
          <Content $backgroud="#1DD0CA">
            <BgWrapper $backgroud="https://res.cloudinary.com/danr1pj0e/image/upload/v1696661097/h1-banner2_npr522.jpg" />
            <ContentWrapper $size="20px" $width="185px">
              Miễn phí giao hàng
              <span>Giảm giá tới 30%</span>
              <ButtonLink $purple href="/categories">
                Mua sắm ngay
              </ButtonLink>
            </ContentWrapper>
          </Content>
          <Content $backgroud="#E4B436">
            <BgWrapper $backgroud="https://res.cloudinary.com/danr1pj0e/image/upload/v1696661097/h1-banner3_q7x2wj.jpg" />
            <Desciption>
              <div>Thức ăn cho chim</div>
              <div>Tốt cho sức khỏe</div>
            </Desciption>
          </Content>
        </BannerContainer>
      )}
      {column == 2 && (
        <BannerContainer $column={column}>
          <Content $backgroud="#D65128">
            <BgWrapper $backgroud="https://res.cloudinary.com/danr1pj0e/image/upload/v1696665597/h1-banner4_aazi5g.jpg" />
            <ContentWrapper $size="24px" $width="260px">
              Đồ dùng cho chó
              <span>Giảm 25%</span>
              <HotLine>
                <span>Đường dây nóng </span>
                05825354778
              </HotLine>
            </ContentWrapper>
          </Content>
          <Content $backgroud="#6939CD">
            <BgWrapper $backgroud="https://res.cloudinary.com/danr1pj0e/image/upload/v1696665598/h1-banner6_ki3c3a.jpg" />
            <ContentWrapper $size="24px" $width="260px">
              Món quà cho thú cưng
              <span>Thức ăn mèo cao cấp</span>
              <Sale>
                Giảm <span>30%</span>
              </Sale>
            </ContentWrapper>
          </Content>
        </BannerContainer>
      )}
      {column == 1 && (
        <BannerContainer $column={column}>
          <Content></Content>
        </BannerContainer>
      )}
    </>
  )
}
