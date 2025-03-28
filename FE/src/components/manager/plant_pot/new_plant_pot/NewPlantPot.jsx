import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './NewPlantPot.css'
import ICONS from '../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'
import LOCALSTORAGE from '../../../../constant/localStorage'
import useLocalStorage from 'use-local-storage'

const NewPlantPot = ({ setShowModal, setRefreshData }) => {
  const [potSize, setPotSize] = useState('')
  const [potMaterial, setPotMaterial] = useState('')
  const [potQuantityAvailable, setPotQuantityAvailable] = useState('')
  const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(atob(auth));
  }, [auth])

  const modalRoot = document.body

  const handleClickClose = () => {
    setShowModal(false)
  }
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
    if (!potSize || !potMaterial || !potQuantityAvailable) {
      showToastMessageFail('All fields are required!')
      return
    }

    const quantity = parseInt(potQuantityAvailable, 10)
    if (isNaN(quantity) || quantity <= 0) {
      showToastMessageFail('Quantity must be a positive number!')
      return
    }

    const plantPot = {
      potSize: potSize,
      potMaterial: potMaterial,
      potQuantityAvailable: potQuantityAvailable,
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-pot`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(plantPot),
        }
      )

      if (!response.ok) throw new Error()
      const data = await response.json()

      if (!data) throw new Error()
      showToastMessageSuccess('Plant Pot was added!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Plant Pot can not be added!')
      setShowModal(true)
    } finally {
      setRefreshData((prev) => !prev)
    }
  }

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            NEW PLANT POT
          </h4>
          <Form.Group>
            <Form.Label className="text-label-login">Size Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={potSize}
              onChange={(e) => setPotSize(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Material</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={potMaterial}
              onChange={(e) => setPotMaterial(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Quantity</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={potQuantityAvailable}
              onChange={(e) => setPotQuantityAvailable(e.target.value)}
            />
          </Form.Group>
          <Button
            text="Create Plant"
            handleOnClick={handleOnClick}
            className="button-create-plant"
          />
        </Form>
        <img
          className="icon-close"
          onClick={handleClickClose}
          src={ICONS.icon_close}
          alt=""
        />
      </div>
    </div>,
    modalRoot
  )
}

export default NewPlantPot
