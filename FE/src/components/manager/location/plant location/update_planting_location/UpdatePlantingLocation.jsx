import React, { useEffect, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const UpdatePlantingLocation = ({ setShowModal, setRefreshData }) => {
  const [locationId, setLocationId] = useState('')
  const [plantId, setPlantId] = useState('')
  const [plantName, setPlantName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isHarvest, setIsHarvest] = useState(false)

  const [plantLocationData, setPlantLocationData] = useState(null)
  const [plantData, setPlantData] = useState([])
  const [locationData, setLocationData] = useState([])

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
    if (!locationId || !plantId || !startDate || !endDate) {
      showToastMessageFail('Please fill in all fields!')
      return
    }

    const today = new Date().toISOString().split('T')[0]
    if (startDate < today) {
      showToastMessageFail('Start date cannot be in the past!')
      return
    }

    if (endDate <= startDate) {
      showToastMessageFail('End date must be after start date!')
      return
    }

    const plantingLocation = {
      locationId: locationId,
      startDate: startDate,
      endDate: endDate,
      harvest: isHarvest,
      plantId: plantId,
    }
    try {
      const id = JSON.parse(
        localStorage.getItem('manager_planting_location_selected')
      )
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/planting-location/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plantingLocation),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      console.log(data)
      console.log(JSON.stringify(plantingLocation))

      if (!data) throw new Error()
      showToastMessageSuccess('Plant Location was updated!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Plant Location can not be updated!')
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
    const fetchPlantingLocation = async () => {
      const id =
        JSON.parse(
          localStorage.getItem('manager_planting_location_selected')
        ) || null
      if (!id) return

      const url = `${
        import.meta.env.VITE_REACT_APP_END_POINT
      }/planting-location/${id}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        const data = result.data

        setPlantLocationData(data)
        setLocationId(data.locationId || '')
        setPlantId(data.plantId || '')
        setPlantName(data.plantName || '')
        setStartDate(data.startDate ? data.startDate.split('T')[0] : '')
        setEndDate(data.endDate ? data.endDate.split('T')[0] : '')
        setIsHarvest(data.harvest || false)
      }
    }

    fetchPlantingLocation()
  }, [])

  useEffect(() => {
    const plantUrl = `${import.meta.env.VITE_REACT_APP_END_POINT}/plant`
    const locationUrl = `${
      import.meta.env.VITE_REACT_APP_END_POINT
    }/location/available?id=${locationId}`

    fetchData(plantUrl, setPlantData)
    fetchData(locationUrl, setLocationData)
  }, [fetchData])

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            NEW PLANT
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Location</Form.Label>
            <Form.Select
              className="input-login input-addition"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="">Select Location</option>
              {locationData.map((location) => (
                <option key={location.locationId} value={location.locationId}>
                  {location.locationName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Plant</Form.Label>
            <Form.Select
              className="input-login input-addition"
              value={plantId}
              onChange={(e) => setPlantId(e.target.value)}
            >
              <option value="">{plantName || 'Select Plant'}</option>{' '}
              {plantData.map((plant) => (
                <option key={plant.plantId} value={plant.plantId}>
                  {plant.plantName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Start Date</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">End Date</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Is Harvest</Form.Label>
            <Form.Check
              type="checkbox"
              className="input-login input-addition"
              checked={isHarvest}
              onChange={(e) => setIsHarvest(e.target.checked)}
              label="Harvest"
            />
          </Form.Group>
          <Button
            text="Update"
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

export default UpdatePlantingLocation
