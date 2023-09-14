import React from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  background-color: #ffffff;
  height: 200px;
  max-width: 1260px;
  margin: 0 auto 120px;
  padding: 40px;
  border-radius: 4px;
`
export const TabsContent = ({ activeTab }) => {
  return (
    <Wrapper>
      {activeTab === 1 && <div>Tab 1 content</div>}
      {activeTab === 2 && <div>Tab 2 content</div>}
      {activeTab === 3 && <div>Tab 3 content</div>}
    </Wrapper>
  )
}
