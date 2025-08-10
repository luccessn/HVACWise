/* eslint-disable prettier/prettier */
import { AppActions } from "./AppActions";
export const addFloorAction = (floor) => ({
  type: AppActions.ADD_FLOOR,
  payload: floor,
});

export const addApartmentToFloorAction = (floorId, apartment) => ({
  type: AppActions.ADD_APARTMENT_TO_FLOOR,
  payload: { floorId, apartment },
});
export const addRoomToApartmentAction = (apartmentId, room) => ({
  type: AppActions.ADD_ROOM_TO_APARTMENT,
  payload: { apartmentId, room },
});

export const addStructureToRoomAction = (apartmentId, roomId, structure) => ({
  type: AppActions.ADD_STRUCTURE_TO_ROOM,
  payload: { apartmentId, roomId, structure },
});

///Clear Remove
export const removeFlorAction = (itemId) => {
  return {
    type: AppActions.REMOVE_FLOOR,
    payload: itemId,
  };
};

export const clearFullHVAC = () => {
  return { type: AppActions.CLEAR_HVAC };
};

export const removeStructureFromRoomAction = (
  apartmentId,
  roomId,
  structureIndex
) => ({
  type: AppActions.REMOVE_STRUCTURE_FROM_ROOM,
  payload: { apartmentId, roomId, structureIndex },
});

/// Edit Structures
export const editStructureInRoomAction = (
  apartmentId,
  roomId,
  structureIndex,
  updatedStructure
) => ({
  type: AppActions.EDIT_STRUCTURE_IN_ROOM,
  payload: { apartmentId, roomId, structureIndex, updatedStructure },
});
