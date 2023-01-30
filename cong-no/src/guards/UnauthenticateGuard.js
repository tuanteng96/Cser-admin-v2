import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function UnauthenticateGuard({ children }) {
  const { hasRight } = useSelector(({ auth }) => ({
    hasRight: auth.Info?.rightsSum?.cong_ca?.hasRight
  }))

  if (!hasRight) {
    return <Navigate to="/yeu-cau-quyen-truy-cap" />
  }

  return children
}
