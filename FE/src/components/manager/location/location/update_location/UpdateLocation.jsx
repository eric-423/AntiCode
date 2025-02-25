import React, { useEffect, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const UpdateLocation = ({ setShowModal, setRefreshData }) => {
  const [areaId, setAreaId] = useState('')
  const [locationName, setLocationName] = useState('')
  const [locationExtent, setLocationExtent] = useState('')
  const [locationWidth, setLocationWidth] = useState('')
  const [locationLength, setLocationLength] = useState('')

  const [locationData, setLocationData] = useState(null)
  const [areaData, setAreaData] = useState([])

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
    const area = {
      locationName: locationName,
      locationExtend: locationExtent,
      locationWidth: locationWidth,
      locationLength: locationLength,
      areaId: areaId,
    }
    try {
      const id = JSON.parse(localStorage.getItem('manager_location_selected'))
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/location/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(area),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()

      if (!data) throw new Error()
      showToastMessageSuccess('Location was updated!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Location can not be updated!')
      setShowModal(true)
    } finally {
      setRefreshData((prev) => !prev)
    }
  }

  const fetchData = useCallback(async (url, setState) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      setState(data.data)
    } catch (error) {
      console.error(error.message)
    }
  }, [])

  useEffect(() => {
    const fetchLocation = async () => {
      const id =
        JSON.parse(localStorage.getItem('manager_location_selected')) || null
      if (!id) return

      const url = `${import.meta.env.VITE_REACT_APP_END_POINT}/location/${id}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        const data = result.data

        setLocationData(data)
        setAreaId(data.area.areaId)
        setLocationName(data.locationName)
        setLocationExtent(data.locationExtent)
        setLocationWidth(data.locationWidth)
        setLocationLength(data.locationLength)
      }
    }

    fetchLocation()
  }, [])

  useEffect(() => {
    const areaUrl = `${import.meta.env.VITE_REACT_APP_END_POINT}/area`

    fetchData(areaUrl, setAreaData)
  }, [fetchData])

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            UPDATE LOCATION
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">AREA</Form.Label>
            <Form.Select
              className="input-login input-addition"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
            >
              <option value="">Select AREA</option>
              {areaData.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Location Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Lcation Extent</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={locationExtent}
              onChange={(e) => setLocationExtent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Width</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={locationWidth}
              onChange={(e) => setLocationWidth(e.target.value)}
              label="Harvest"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Length</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={locationLength}
              onChange={(e) => setLocationLength(e.target.value)}
              label="Harvest"
            />
          </Form.Group>
          <Button
            text="Update Area"
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

export default UpdateLocation
