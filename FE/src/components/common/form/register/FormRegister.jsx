import { useState } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '../../button/Button'
import './FormRegister.css'
import ICONS from '../../../../constant/Image'
import useMediaQuery from '../../../../hook/useMediaQuery'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import LOCALSTORAGE from '../../../../constant/localStorage'
import axios from 'axios'

const FormRegister = () => {
  const [guestRegisterInformation, setGuestRegisterInformation] =
    useLocalStorage(LOCALSTORAGE.GUEST_REGISTER_INFORMATION, '')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const isScreenPhone = useMediaQuery('(max-width: 576px)')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleOnClick = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_END_POINT
        }/send-otp?phoneNumber=${phoneNumber}`
      )
      if (!response || response.status !== 200) throw new Error()
      setGuestRegisterInformation(btoa([email, password, name, phoneNumber]))
      navigate('verify-otp')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form
        className={isScreenPhone ? 'center-content form mb-4' : 'form mb-4'}
      >
        <Form.Group className="mb-3">
          <Form.Label className="text-label-login">Name</Form.Label>
          <Form.Control
            className="input-login"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-label-login">Email</Form.Label>
          <Form.Control
            className="input-login"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-label-login">Phone Number</Form.Label>
          <Form.Control
            className="input-login"
            type="email"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label className="text-label-login">Password</Form.Label>
          <Form.Control
            className="input-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button
          text="Sign up"
          handleOnClick={handleOnClick}
          isLoading={isLoading}
        />
      </Form>
      <div
        className={
          isScreenPhone ? 'line-or-line center-content' : 'line-or-line'
        }
      >
        <div className="line"></div>or
        <div className="line"></div>
      </div>
      {isScreenPhone ? (
        <div className="login-other">
          <img src={ICONS.icon_google} alt="" />
          <img src={ICONS.icon_apple} alt="" />
        </div>
      ) : (
        <div className="login-other-button">
          <img src={ICONS.icon_google} alt="" />
          <span>Sign up with Google</span>
        </div>
      )}

      <p
        className={!isScreenPhone ? 'no-account' : 'no-account text-center'}
        style={!isScreenPhone ? { marginBottom: '5vh' } : {}}
      >
        You already have account?{' '}
        <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Login
        </span>
      </p>
    </>
  )
}

export default FormRegister
