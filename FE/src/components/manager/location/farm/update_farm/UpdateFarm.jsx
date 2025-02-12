import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'

const UpdatePlant = ({ setShowModal, itemUpdate }) => {
  const [name, setName] = useState()
  const [extent, setExtent] = useState()
  const [address, setAddress] = useState()
  const modalRoot = document.body
  const handleClickClose = () => {
    setShowModal(false)
  }
  const [plantTypesData, setPlantTypesData] = useState()
  const handleFetchDataPlantType = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/v1/plant-type/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      setPlantTypesData(data)
    } catch (error) {}
  }
  useEffect(() => {
    handleFetchDataPlantType()
  }, [])
  useEffect(() => {
    console.log(itemUpdate)
  })
  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            UPDATE PLANT
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Name</Form.Label>
            <Form.Control
              className="input-login input-addition input-name-create-plant"
              type="text"
              placeholder="Rosa Orange Glow (Shrub Rose)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Extent</Form.Label>
            <Form.Control
              className="input-login input-addition input-characteristis-create-plant"
              type="text"
              placeholder="Showy, Cut Flowers"
              value={extent}
              onChange={(e) => setExtent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Address</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              placeholder="Acid, Alkaline, Neutral"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Button text="Update Plant" className="button-create-plant" />
        </Form>
        <img
          className="icon-close"
          onClick={() => handleClickClose()}
          src={ICONS.icon_close}
          alt=""
        />
      </div>
    </div>,
    modalRoot
  )
}

export default UpdatePlant
