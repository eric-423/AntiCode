import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ICONS from "../../../../../constant/Image.js";
import "./Body.css";
import useGridColumn from "../../../../../hook/useGridColumn.js";
import UpdateProcess from "../../UpdateProcess/updateProcess.jsx";

const Body = ({
    item,
    index,
    itemsActive,
    listTitle,
    handleUpdateProcess,
    setItemUpdateId,
    setShowModalDetail,
    showModalDetail,

    plantData,
    plantMedium,
    setPlantMediumSelectId,
    plantPot,
    setPlantPotSelectId,
    plantChemical,
    setSelectedPlantChemical,
    plantWater,
    setSelectedPlantWater,
    farmingEquipment,
    setSelectedFarmingEquipment,
    setNameProcess,
    setDescriptionProcess,
    setPlantSelectId,
    setMediumWeight,
    setChemicalVolumn,
    setWaterVolumn,
}) => {
    const isActive = Array.isArray(itemsActive) && itemsActive.includes(item.plantingProcessId);
    const gridColumnTemplate = useGridColumn(listTitle)


    return (
        <>
            {showModalDetail && (
                <UpdateProcess
                    itemUpdate={item}
                    setShowModalDetail={setShowModalDetail}
                    handleUpdateProcess={handleUpdateProcess}
                    setItemUpdateId={setItemUpdateId}

                    plantData={plantData}
                    plantMedium={plantMedium}
                    setPlantMediumSelectId={setPlantMediumSelectId}
                    plantPot={plantPot}
                    setPlantPotSelectId={setPlantPotSelectId}
                    plantChemical={plantChemical}
                    setSelectedPlantChemical={setSelectedPlantChemical}
                    plantWater={plantWater}
                    setSelectedPlantWater={setSelectedPlantWater}
                    farmingEquipment={farmingEquipment}
                    setSelectedFarmingEquipment={setSelectedFarmingEquipment}
                    setNameProcess={setNameProcess}
                    setDescriptionProcess={setDescriptionProcess}
                    setPlantSelectId={setPlantSelectId}
                    setMediumWeight={setMediumWeight}
                    setChemicalVolumn={setChemicalVolumn}
                    setWaterVolumn={setWaterVolumn}

                />
            )}

            <ul
                className={isActive ? "body-table body-table-active" : "body-table"}
                onClick={() => setShowModalDetail(!showModalDetail)}
                style={{ gridTemplateColumns: gridColumnTemplate }}

            >
                <li>{index + 1}</li>
                <li>{item.plantingProcessName}</li>
                <li>{new Date(item.createdAt).toLocaleDateString()}</li>
                <li>{item.plantingMediumProcessDTO.plantingMediumName}</li>
                <li>{item.plantingPotProcessDTO.plantingPotSize}</li>
                <li>{item.waterProcessDTO.waterName}</li>
                <li>{item.chemicalProcessDTO.chemicalName}</li>
                <li>{item.farmingEquipmentProcessDTO.equipmentName}</li>
                <li>{item.plantingProcessDescription}</li>

                {/* <li>
                    <div
                        onClick={(event) => handleShowUpdatePopup(event, item)}
                        className="update-table-body"
                    >
                        <img src={ICONS.icon_update} alt="Update" />
                    </div>
                </li> */}


                {isActive && (
                    <img className="tick-active-table-item" src={ICONS.icon_tick} alt="Active" />
                )}
            </ul>
        </>
    );
};

Body.propTypes = {
    item: PropTypes.shape({
        plantingProcessId: PropTypes.number.isRequired,
        plantingProcessName: PropTypes.string.isRequired,
        plantingProcessDescription: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        plantingMediumProcessDTO: PropTypes.shape({
            plantingMediumId: PropTypes.number.isRequired,
            plantingMediumName: PropTypes.string.isRequired,
            plantingMediumWeight: PropTypes.number.isRequired,
        }),
        plantingPotProcessDTO: PropTypes.shape({
            plantingPotId: PropTypes.number.isRequired,
            plantingPotSize: PropTypes.string.isRequired,
            plantingPotMaterial: PropTypes.string.isRequired,
        }),
        waterProcessDTO: PropTypes.shape({
            waterId: PropTypes.number.isRequired,
            waterName: PropTypes.string.isRequired,
            purity: PropTypes.number,
            phLevel: PropTypes.number,
            volume: PropTypes.number.isRequired,
        }),
        chemicalProcessDTO: PropTypes.shape({
            chemicalId: PropTypes.number.isRequired,
            chemicalName: PropTypes.string.isRequired,
            chemicalVolume: PropTypes.number.isRequired,
            chemicalDescription: PropTypes.string.isRequired,
        }),
        farmingEquipmentProcessDTO: PropTypes.shape({
            equipmentId: PropTypes.number.isRequired,
            equipmentName: PropTypes.string.isRequired,
        }),
    }).isRequired,
    index: PropTypes.number.isRequired,
    itemsActive: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    handleSelectItem: PropTypes.func.isRequired,
    listTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleUpdateProcess: PropTypes.func.isRequired,
    setItemUpdateId: PropTypes.func.isRequired,
    setShowModalDetail: PropTypes.func.isRequired,
    showModalDetail: PropTypes.bool.isRequired,

    plantData: PropTypes.array.isRequired,
    plantMedium: PropTypes.array.isRequired,
    setPlantMediumSelectId: PropTypes.func.isRequired,
    plantPot: PropTypes.array.isRequired,
    setPlantPotSelectId: PropTypes.func.isRequired,
    plantChemical: PropTypes.array.isRequired,
    setSelectedPlantChemical: PropTypes.func.isRequired,
    plantWater: PropTypes.array.isRequired,
    setSelectedPlantWater: PropTypes.func.isRequired,
    farmingEquipment: PropTypes.array.isRequired,
    setSelectedFarmingEquipment: PropTypes.func.isRequired,
    setNameProcess: PropTypes.func.isRequired,
    setDescriptionProcess: PropTypes.func.isRequired,
    setPlantSelectId: PropTypes.func.isRequired,
    setMediumWeight: PropTypes.func.isRequired,
    setChemicalVolumn: PropTypes.func.isRequired,
    setWaterVolumn: PropTypes.func.isRequired,
};


export default Body;
