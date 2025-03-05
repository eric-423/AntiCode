import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import LOCALSTORAGE from '../../../../../constant/localStorage'
import { Form } from 'react-bootstrap'
import useMediaQuery from '../../../../../hook/useMediaQuery'
import Button from '../../../button/Button'
import axios from 'axios'
import { toast } from 'react-toastify/unstyled'

const VerifyPhoneNumber = () => {
  const [guestRegisterInformation, setGuestRegisterInformation] =
    useLocalStorage(LOCALSTORAGE.GUEST_REGISTER_INFORMATION, '')
  const navigate = useNavigate()
  const [code, setCode] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const isScreenPhone = useMediaQuery('(max-width: 576px)')
  const guest = atob(guestRegisterInformation).split(',')
  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
    })
  }
  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: 'top-right',
    })
  }
  const handleOnClick = async () => {
    setIsLoading(true)
    try {
      console.log(guest)
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/verify-otp?phoneNumber=${
          guest[3]
        }&otp=${code}`
      )

      if (!response || response.status !== 200) throw new Error()
      const data = {
        password: guest[1],
        userName: guest[2],
        email: guest[0],
        phoneNumber: guest[3],
      }
      const responseRegister = await axios.post(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/user/signup`,
        data
      )
      if (!responseRegister || responseRegister.status !== 201)
        throw new Error()
      setGuestRegisterInformation('')
      showToastMessageSuccess('Verify successful!')
      navigate('/')
    } catch (e) {
      console.log(e)
      showToastMessageFail('Verify Fail!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        marginBottom: '30vh',
      }}
    >
      <p className="mt-5 mb-1.5" style={{ color: 'rgba(0,0,0,0.5)' }}>
        We sent an email to{' '}
        <span style={{ color: 'rgba(0,0,0,0.8)' }}>{guest[3]}</span>. Please
        confirm your phone number by enter your code
      </p>
      <Form
        className={isScreenPhone ? 'center-content form mb-4' : 'form mb-4'}
      >
        <Form.Group className="mb-3">
          <Form.Label className="text-label-login">Code</Form.Label>
          <Form.Control
            className="input-login"
            type="text"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code"
          />
        </Form.Group>
        <Button
          text="Verify"
          handleOnClick={handleOnClick}
          isLoading={isLoading}
        />
      </Form>
    </div>
  )
}

export default VerifyPhoneNumber
