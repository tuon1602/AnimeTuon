"use client"

import React from 'react'
import { Pagination } from 'antd'

const PaginationComponent:React.FC = () => {
  const handlePageNumberChange = (page:any,pageSize:any)=>{
    console.log(page)
    console.log(pageSize)
  }
  return (
    <Pagination defaultCurrent={1} total={100} onChange={handlePageNumberChange}/>
  )
}

export default PaginationComponent