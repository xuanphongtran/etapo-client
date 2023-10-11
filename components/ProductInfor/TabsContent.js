import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AccountIcon } from '../icons/Icon'
import Rating, { SelectedRating } from '../Common/Rating'
import Button from '../Common/Button'
import AXIOS from '@/lib/axios'

const Wrapper = styled.div`
  background-color: #ffffff;
  max-width: 1220px;
  margin: 0 auto 140px;
  padding: 40px;
  border-radius: 4px;
`
const Description = styled.p`
  font-size: 16px;
  color: #666666;
  white-space: pre-line;
`
const ItemAttributes = styled.tr`
  border-top: 1px dashed;
  border-bottom: 1px dashed;
  border-color: #e5e5e5;
`
const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border-collapse: collapse;
`
const ItemLabel = styled.th`
  text-align: left;
  border: 1px solid #e5e5e5;
  padding: 14px 20px;
  text-transform: capitalize;
  width: 40%;
`
const ItemValue = styled.td`
  padding: 14px 20px;
  border: 1px solid #e5e5e5;
`

const CommentList = styled.ol`
  margin-bottom: 50px;
  padding: 0;
  list-style: none;
`
const CommentContainer = styled.li`
  margin-bottom: 35px;
  display: flex;
`
const Avatar = styled.div`
  height: 50px;
  min-width: 50px;
  background-color: #999;
  border-radius: 50%;
  margin-top: 5px;
  svg {
    width: 24px;
    margin: 10px auto;
    display: flex;
    color: #ffffff;
  }
`
const Meta = styled.div`
  display: flex;
  align-items: center;
  div:first-child {
    font-size: 16px;
    font-weight: 700;
    margin-right: 10px;
  }
  div:last-child {
    color: #999999;
  }
`
const CommentText = styled.div`
  margin-left: 10px;
`
const ReviewForm = styled.form``
const HeaderForm = styled.div`
  display: flex;
  align-items: center;
  div:first-child {
    font-size: 16px;
    margin: 3px 15px 10px 0;
    &::after {
      content: '*';
      margin-left: 3px;
      color: red;
    }
  }
`
const CommentForm = styled.textarea`
  width: -webkit-fill-available;
  overflow: auto;
  min-height: 120px;
  vertical-align: top;
  font-family: 'Quicksand', sans-serif;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 12px 18px;
  margin-bottom: 15px;
  &:focus {
    outline: 1px solid #6839cc;
  }
`
export default function TabsContent({ activeTab, product }) {
  const [startPoint, setStartPoint] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [login, setLogin] = useState(false)
  const [review, setReview] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) setLogin(true)
  }, [])

  useEffect(() => {
    AXIOS.get('/product/reviews', {
      params: { productId: product._id },
    }).then((response) => setReview(response.data))
  }, [product._id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await AXIOS.post('/product/reviews', {
        startPoint,
        comment: commentText,
        productId: product._id,
      })
      if (response) {
        // window.location.reload()
      } else {
        // Xử lý lỗi
        console.error(data.message)
      }
      console.log(startPoint, commentText)
    } catch (error) {
      console.error('Lỗi kết nối:', error.message)
    }
  }
  const handleRatingChange = (selectedStars) => {
    setStartPoint(selectedStars)
  }

  return (
    <Wrapper>
      {activeTab === 1 && <Description>{product.description}</Description>}
      {activeTab === 2 && (
        <div>
          <Table>
            <tbody>
              {product.properties?.map((pro, index) => (
                <ItemAttributes key={index}>
                  <ItemLabel>{pro.label}</ItemLabel>
                  <ItemValue>{pro.value}</ItemValue>
                </ItemAttributes>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      {activeTab === 3 && (
        <div>
          <CommentList>
            {review?.map((a, index) => (
              <CommentContainer key={index}>
                <Avatar>
                  <AccountIcon />
                </Avatar>
                <CommentText>
                  <Rating size="16px" $notReview value={a?.startPoint} />
                  <Meta>
                    <div>{a.userId?.name}</div>
                    <div>{a.updatedAt}</div>
                  </Meta>
                  <Description>{a?.comment}</Description>
                </CommentText>
              </CommentContainer>
            ))}
          </CommentList>
          {login ? (
            <ReviewForm onSubmit={handleSubmit}>
              <HeaderForm>
                <div>Đánh giá của bạn</div>{' '}
                <SelectedRating $notReview size="18px" onStarClick={handleRatingChange} />
              </HeaderForm>
              <CommentForm
                placeholder="Nhận xét của bạn *"
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button primary="true">Xác nhận</Button>
            </ReviewForm>
          ) : (
            <></>
          )}
        </div>
      )}
    </Wrapper>
  )
}
