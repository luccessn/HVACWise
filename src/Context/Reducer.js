/* eslint-disable prettier/prettier */
import { AppActions } from "./AppActions";
export const Initials = {
  hvacItems: [],
};

export const Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case AppActions.ADD_FLOOR:
      return { ...state, hvacItems: [...state.hvacItems, payload] };
    case AppActions.ADD_APARTMENT_TO_FLOOR:
      return {
        ...state,
        hvacItems: state.hvacItems.map((floor) =>
          floor.floorId === action.payload.floorId
            ? {
                ...floor,
                apartments: [...floor.apartments, action.payload.apartment],
              }
            : floor
        ),
      };
    case AppActions.ADD_ROOM_TO_APARTMENT:
      return {
        ...state,
        hvacItems: state.hvacItems.map((floor) => ({
          ...floor,
          apartments: floor.apartments.map((apt) =>
            apt.id === payload.apartmentId
              ? {
                  ...apt,
                  rooms: [...apt.rooms, payload.room],
                }
              : apt
          ),
        })),
      };
    case AppActions.ADD_STRUCTURE_TO_ROOM:
      console.log("REDUCER ADD_STRUCTURE_TO_ROOM", payload);
      return {
        ...state,
        hvacItems: state.hvacItems.map((floor) => ({
          ...floor,
          apartments: floor.apartments.map((apt) =>
            apt.id === payload.apartmentId
              ? {
                  ...apt,
                  rooms: apt.rooms.map((room) =>
                    room.id === payload.roomId
                      ? {
                          ...room,
                          structures: [...room.structures, payload.structure],
                        }
                      : room
                  ),
                }
              : apt
          ),
        })),
      };

    case AppActions.REMOVE_FLOOR:
      return {
        ...state,
        hvacItems: state.hvacItems.filter((item) => item.id !== payload),
      };

    case AppActions.CLEAR_HVAC:
      return { ...state, hvacItems: [] };
    case "ADD_FLOOR":
      return {
        ...state,
        hvacItems: [...state.hvacItems, action.payload],
      };
    case AppActions.REMOVE_STRUCTURE_FROM_ROOM:
      return {
        ...state,
        hvacItems: state.hvacItems.map((floor) => ({
          ...floor,
          apartments: floor.apartments.map((apt) =>
            apt.id === payload.apartmentId
              ? {
                  ...apt,
                  rooms: apt.rooms.map((room) =>
                    room.id === payload.roomId
                      ? {
                          ...room,
                          structures: room.structures.filter(
                            (_, index) => index !== payload.structureIndex
                          ),
                        }
                      : room
                  ),
                }
              : apt
          ),
        })),
      };
    //Edit
    case AppActions.EDIT_STRUCTURE_IN_ROOM:
      return {
        ...state,
        hvacItems: state.hvacItems.map((floor) => ({
          ...floor,
          apartments: floor.apartments.map((apt) =>
            apt.id === payload.apartmentId
              ? {
                  ...apt,
                  rooms: apt.rooms.map((room) =>
                    room.id === payload.roomId
                      ? {
                          ...room,
                          structures: room.structures.map((structure, index) =>
                            index === payload.structureIndex
                              ? payload.updatedStructure
                              : structure
                          ),
                        }
                      : room
                  ),
                }
              : apt
          ),
        })),
      };

    default:
      break;
  }
};
