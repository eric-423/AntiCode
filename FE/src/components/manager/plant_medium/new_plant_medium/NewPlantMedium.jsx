import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './NewPlantMedium.css'
import ICONS from '../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'
import useLocalStorage from 'use-local-storage'
import LOCALSTORAGE from '../../../../constant/localStorage'

const NewPlantMedium = ({ setShowModal, setRefreshData }) => {
  const [mediumName, setMediumName] = useState('')
  const [description, setDescription] = useState('')
  const [mediumWeightAvailable, setMediumWeightAvailable] = useState('')
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
    if (!mediumName || !mediumWeightAvailable) {
      showToastMessageFail('Name and Weight are required!')
      return
    }

    const weight = parseFloat(mediumWeightAvailable)
    if (weight <= 0) {
      showToastMessageFail('Weight must be a positive number!')
      return
    }

    const plantMedium = {
      mediumName: mediumName,
      description: description,
      mediumWeightAvailable: mediumWeightAvailable,
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-medium`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(plantMedium),
        }
      )

      if (!response.ok) throw new Error()
      const data = await response.json()

      if (!data) throw new Error()
      showToastMessageSuccess('Plant Medium was added!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Plant Medium can not be added!')
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
            NEW PLANT MEDIUM
          </h4>
          <Form.Group>
            <Form.Label className="text-label-login">Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={mediumName}
              onChange={(e) => setMediumName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Description</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Weight</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={mediumWeightAvailable}
              onChange={(e) => setMediumWeightAvailable(e.target.value)}
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

export default NewPlantMedium
