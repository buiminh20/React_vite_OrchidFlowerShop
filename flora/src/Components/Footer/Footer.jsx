import React from 'react'
import { Card } from 'react-bootstrap'
import { FaHeart } from "react-icons/fa";
export default function Footer() {
  return (
    <>
    <Card className="text-center" >
        <i style={{color: 'blue'}}>Flora the Orchid Shop <br /></i>
        <i>Have a nice day <FaHeart color='red' size={20}/></i>

        </Card>
    </>
  )
}
