import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './NewPlantMedium.css'
import ICONS from '../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const NewPlantMedium = ({ setShowModal, setRefreshData }) => {
  const [mediumName, setMediumName] = useState('')
  const [description, setDescription] = useState('')
  const [mediumWeightAvailable, setMediumWeightAvailable] = useState('')

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
