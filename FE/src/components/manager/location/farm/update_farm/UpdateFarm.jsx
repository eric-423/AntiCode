import React, { useEffect, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const UpdateFarm = ({ setShowModal, setRefreshData }) => {
  const [farmName, setFarmName] = useState('')
  const [farmExtend, setFarmExtend] = useState('')
  const [farmAddress, setFarmAddress] = useState('')
  const [farmLength, setFarmLength] = useState('')
  const [farmWidth, setFarmWidth] = useState('')

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
    if (!farmName || !farmExtend || !farmAddress || !farmLength || !farmWidth) {
      showToastMessageFail('All fields are required!')
      return
    }

    const width = parseFloat(farmWidth)
    const length = parseFloat(farmLength)
    const extent = parseFloat(farmExtend)

    if (width <= 0 || length <= 0 || extent <= 0) {
      showToastMessageFail(
        'Width, Length, and Extent must be positive numbers!'
      )
      return
    }

    if (width * length > extent) {
      showToastMessageFail('Width x Length cannot exceed Farm Extent!')
      return
    }

    const farm = {
      farmName: farmName,
      farmExtend: farmExtend,
      farmAddress: farmAddress,
      farmLength: farmLength,
      farmWidth: farmWidth,
    }
    try {
      const id = JSON.parse(localStorage.getItem('manager_farm_selected'))
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/farm/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(farm),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()

      if (!data) throw new Error()
      showToastMessageSuccess('Farm was updated!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Farm can not be updated!')
      setShowModal(true)
    } finally {
      setRefreshData((prev) => !prev)
    }
  }

  useEffect(() => {
    const fetchFarm = async () => {
      const id =
        JSON.parse(localStorage.getItem('manager_farm_selected')) || null
      if (!id) return

      const url = `${import.meta.env.VITE_REACT_APP_END_POINT}/farm/${id}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        const data = result.data

        setFarmName(data.farmName)
        setFarmExtend(data.farmExtend)
        setFarmAddress(data.farmAddress)
        setFarmLength(data.farmLength)
        setFarmWidth(data.farmWidth)
      }
    }

    fetchFarm()
  }, [])

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            UPDATE FARM
          </h4>
          <Form.Group>
            <Form.Label className="text-label-login">Farm Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Address</Form.Label>
            <Form.Control
              type="texr"
              className="input-login input-addition"
              value={farmAddress}
              onChange={(e) => setFarmAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Extent</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={farmExtend}
              onChange={(e) => setFarmExtend(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Length</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={farmLength}
              onChange={(e) => setFarmLength(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Width</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={farmWidth}
              onChange={(e) => setFarmWidth(e.target.value)}
            />
          </Form.Group>
          <Button
            text="Update Farm"
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

export default UpdateFarm
