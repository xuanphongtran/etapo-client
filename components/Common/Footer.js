import styled from 'styled-components'
import logo from 'public/logo.svg'
import Image from 'next/image'
import { FacebookIcon, InstagramIcon, PhoneIcon, TwitterIcon, ZaloIcon } from '../icons/Icon'

const FooterConteiner = styled.div`
  background-image: url(https://res.cloudinary.com/danr1pj0e/image/upload/v1696780052/footer-bg_hf2ntt.jpg);
  padding: 90px 110px 40px 110px;
  border-top: 1px dashed #e5e5e5;
  height: 260px;
`
const FooterWrapper = styled.div`
  display: flex;
`
const FooterColumn = styled.div`
  padding-right: 30px;
`
const FootetResume = styled.div`
  color: #666;
  font-size: 14px;
  margin: 20px 0;
`
const HotLineOrder = styled.div`
  display: flex;
  gap: 5px;
  font-size: 14px;
  font-weight: 700;
  svg {
    height: 16px;
    font-weight: 500;
  }
`
const Hotline = styled.h3`
  color: #ff782c;
  margin-top: 5px;
`
const SocialContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 260px;
`
const SocialButton = styled.a`
  background-color: #f5f5f5;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  align-items: center;
  justify-content: center;
  display: flex;
  &:hover {
    background-color: #6839cc;
  }
`
const FooterTitle = styled.div`
  font-weight: 700;
  min-width: 140px;
  margin: 12px 0 35px;
`
const FooterUl = styled.ul`
  list-style-type: none;
  padding: 0;
`
const Footerli = styled.li`
  height: 30px;
  color: #666;
  &:hover {
    color: #ff782c;
  }
`
const FooterDivider = styled.div`
  width: 100%;
  border-top: 1px dashed #e5e5e5;
  display: flex;
  padding: 15px 0;
  justify-content: space-between;
`
const Copyrights = styled.div`
  color: #666;
  font-size: 12px;
`
const Footer = () => {
  return (
    <footer>
      <FooterConteiner>
        <FooterWrapper>
          <FooterColumn>
            <Image src={logo} width={120} height={40} alt="Logo" />
            <FootetResume>
              We know pets are like family, so we are committed to providing the highest-quality
              products that you can trust.
            </FootetResume>
            <HotLineOrder>
              <PhoneIcon />
              Hotline Order
            </HotLineOrder>
            <Hotline>+84-582-534-778</Hotline>
            <SocialContainer>
              <SocialButton target="_blank" rel="noopener" href="https://www.facebook.com/">
                <FacebookIcon />
              </SocialButton>
              <SocialButton target="_blank" rel="noopener" href="https://www.twitter.com/">
                <TwitterIcon />
              </SocialButton>
              <SocialButton target="_blank" rel="noopener" href="https://www.instagram.com/">
                <InstagramIcon />
              </SocialButton>
              <SocialButton target="_blank" rel="noopener" href="https://zaloweb.me/">
                <ZaloIcon />
              </SocialButton>
            </SocialContainer>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>SHOP</FooterTitle>
            <FooterUl>
              <Footerli>Dành cho chó</Footerli>
              <Footerli>Dành cho mèo</Footerli>
              <Footerli>Thương hiệu</Footerli>
              <Footerli>Blogs</Footerli>
              <Footerli>Bộ sưu tập</Footerli>
            </FooterUl>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>VỀ ZIGGY</FooterTitle>
            <FooterUl>
              <Footerli>Giới thiệu</Footerli>
              <Footerli>Điều khoản sử dụng</Footerli>
              <Footerli>Chính sách bảo mật</Footerli>
            </FooterUl>
          </FooterColumn>
          {/* <FooterColumn>
            <FooterTitle>COMPANY</FooterTitle>
            <FooterUl>
              <Footerli>New Product</Footerli>
              <Footerli>Best Sellers</Footerli>
              <Footerli>Bundle & Save</Footerli>
              <Footerli>Online Gift Card</Footerli>
              <Footerli>Discount </Footerli>
              <Footerli>Pet Store Locator</Footerli>
            </FooterUl>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>NEWSLETTER</FooterTitle>
          </FooterColumn> */}
        </FooterWrapper>
        <FooterDivider>
          <Copyrights>Copyright © 2023 XuanPhong. All rights reserved.</Copyrights>
        </FooterDivider>
      </FooterConteiner>
    </footer>
  )
}
export default Footer
