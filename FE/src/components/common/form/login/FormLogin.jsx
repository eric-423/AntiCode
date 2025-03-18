import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from '../../button/Button'
import './FormLogin.css'
import ICONS from '../../../../constant/Image'
import useMediaQuery from '../../../../hook/useMediaQuery'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import BASE from '../../../../constant/base'
import useLocalStorage from 'use-local-storage'
import LOCALSTORAGE from '../../../../constant/localStorage'
import useRole from '../../../../hook/useRole'

const FormLogin = () => {
  const navigate = useNavigate()
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION,
    ''
  )

  const isScreenPhone = useMediaQuery('(max-width: 576px)')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const checkLoginStatus = () => {
      if (accountLoginInformation) {
        const data = atob(accountLoginInformation)
        const role = useRole(data)
        if (role.admin) {
          navigate('/admin')
        } else if (role.manager) {
          navigate('/manager')
        } else if (role.worker) {
          navigate('/worker')
        }
      }
    }

    checkLoginStatus()
  }, [accountLoginInformation, navigate])

  const handleOnClick = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const body = {
        email,
        password,
      }
      const response = await axios.post(
        `${BASE.BASE_URL}/user/signin`, body
      )
      if (!response || response.status !== 200 || response.data.data === '')
        throw new Error()
      const data = response.data.data

      setAccountLoginInformation(btoa(data))

      const role = useRole(data)
      console.log(role)
      if (role.admin) {
        navigate('/admin')
      } else if (role.manager) {
        navigate('/manager')
      } else if (role.worker) {
        navigate('/worker')
      }
    } catch (error) {
      if (error.status == 404) {
        setErrorMessage(error.response.data.data)
      } else {
        setErrorMessage('Wrong email or password')
      }
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
          <Form.Label className="text-label-login">Email</Form.Label>
          <Form.Control
            className="input-login"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-label-login">Password</Form.Label>
          <Form.Control
            className="input-login"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <p className="mb-4 text-end text-forgot-password">Forgot password?</p>
        <Button
          text="Login"
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
          <span>Sign in with Google</span>
        </div>
      )}

      <p
        className={!isScreenPhone ? 'no-account' : 'no-account text-center'}
        style={!isScreenPhone ? { marginBottom: '10vh' } : {}}
      >
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/registrations')}
          style={{ cursor: 'pointer' }}
        >
          Sign up
        </span>
      </p>
    </>
  )
}

export default FormLogin
