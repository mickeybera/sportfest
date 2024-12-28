import React from 'react'
import CardList from './CardList'

function Contest() {
    const items = [
    {
        "id":1,
        "name":"Yearly Cricket",
        "image":"cricket.jpg",
    },
    {
        "id":2,
        "name":"Auction Cricket",
        "image":"cricket2.avif"
    },
    {
        "id":3,
        "name":"Carrom Double",
        "image":"carrom.jpg"
    },
    {
        "id":4,
        "name":"Carrom Mix Double",
        "image":"carrom2.jpg"
    },
    {
        "id":5,
        "name":"Badminton Double",
        "image":"batminton.jpg"
    },
    {
        "id":6,
        "name":"Badminton Mix Double",
        "image":"batminton2.jpg"
    },
    {
        "id":7,
        "name":"Yearly Football",
        "image":"football.jpg"
    },
    {
        "id":8,
        "name":"Chess",
        "image":"chess.jpg"
    },
    {
        "id":9,
        "name":"Men's Volley",
        "image":"men volley.avif"
    },
    {
        "id":10,
        "name":"Women's Volley",
        "image":"women volley.jpg"
    }
];

  return (
    <div className='mt-12'>
      <CardList items={items}/>
    </div>
  )
}

export default Contest
