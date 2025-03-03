import React, { useEffect, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import ICONS from '../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const UpdatePlantPot = ({ setShowModal, setRefreshData }) => {
  const [potSize, setPotSize] = useState('')
  const [potMaterial, setPotMaterial] = useState('')
  const [potQuantityAvailable, setPotQuantityAvailable] = useState('')

  const modalRoot = document.body

  const handleClickClose = () => {
    setShowModal(false)
  }

  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: 'top-right',
    })
  }

  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
    })
  }

  const handleOnClick = async () => {
    const pot = {
      potSize: potSize,
      potMaterial: potMaterial,
      potQuantityAvailable: potQuantityAvailable,
    }
    try {
      const id = JSON.parse(localStorage.getItem('manager_plant_pot_selected'))
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-pot/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pot),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()

      if (!data) throw new Error()
      showToastMessageSuccess('Plant Pot was updated!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Plant Pot can not be updated!')
      setShowModal(true)
    } finally {
      setRefreshData((prev) => !prev)
    }
  }

  useEffect(() => {
    const fetchPlantPot = async () => {
      const id =
        JSON.parse(localStorage.getItem('manager_plant_pot_selected')) || null
      if (!id) return

      const url = `${import.meta.env.VITE_REACT_APP_END_POINT}/plant-pot/${id}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        const data = result.data

        console.log(data)

        setPotSize(data.potSize)
        setPotMaterial(data.potMaterial)
        setPotQuantityAvailable(data.potQuantityAvailable)
      }
    }

    fetchPlantPot()
  }, [])

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            UPDATE PLANT POT
          </h4>
          <Form.Group>
            <Form.Label className="text-label-login">Size</Form.Label>
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
              type="text"
              className="input-login input-addition"
              value={potMaterial}
              onChange={(e) => setPotMaterial(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Quantty</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={potQuantityAvailable}
              onChange={(e) => setPotQuantityAvailable(e.target.value)}
            />
          </Form.Group>
          <Button
            text="Update Plant Pot"
            className="button-create-plant"
            handleOnClick={handleOnClick}
          />
        </Form>
        <img
          className="icon-close"
          onClick={handleClickClose}
          src={ICONS.icon_close}
          alt="Close"
        />
      </div>
    </div>,
    modalRoot
  )
}

export default UpdatePlantPot
