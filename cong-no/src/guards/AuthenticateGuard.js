import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthenticateGuard({ children }) {
  const { hasRight } = useSelector(({ auth }) => ({
    hasRight: auth.Info?.rightsSum?.cong_ca?.hasRight
  }))
  if (hasRight) {
    return <Navigate to="/" />
  }
  return children
}
