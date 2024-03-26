import React from 'react'
import { Card, Skeleton } from 'antd'

const LoadingCard = ({ count }) => {

    const loopCard = () => {
        let cards = [];
        for (let i = 0; i < count; i++) {
            cards.push(
                <Card className='col-md-4'>
                    <Skeleton active />
                </Card>
            );
        }
        return cards
    }



  return (
    <>
        <div className='row pb-5'>{loopCard()}</div>
    </>
  )
}

export default LoadingCard