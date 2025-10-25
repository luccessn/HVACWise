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
                  rooms: [
                    ...apt.rooms,
                    {
                      ...payload.room,
                      m2: Number(payload.room.m2) || 0, // ✅ ყოველთვის ჩასვით
                      // sunny: Number(payload.room.sunny) || 0,
                      // sunnyLabel: payload.room.sunnyLabel || "",
                      Temp: payload.room.Temp || "",

                      humans: Number(payload.room.humans) || 0,
                    },
                  ],
                }
              : apt
          ),
        })),
      };
    case AppActions.ADD_STRUCTURE_TO_ROOM:
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
    //removes
    case AppActions.REMOVE_ROOM_FROM_APARTMENT:
      return {
        ...state,
        hvacItems: state.hvacItems.map((floor) => ({
          ...floor,
          apartments: floor.apartments.map((apt) =>
            apt.id === payload.apartmentId
              ? {
                  ...apt,
                  rooms: apt.rooms.filter((room) => room.id !== payload.roomId),
                }
              : apt
          ),
        })),
      };

    case AppActions.REMOVE_APARTMENT_FROM_FLOOR:
      return {
        ...state,
        hvacItems: state.hvacItems.map((floor) =>
          floor.floorId === payload.floorId
            ? {
                ...floor,
                apartments: floor.apartments.filter(
                  (apt) => apt.id !== payload.apartmentId
                ),
              }
            : floor
        ),
      };

    case AppActions.REMOVE_FLOOR:
      return {
        ...state,
        hvacItems: state.hvacItems.filter((floor) => floor.floorId !== payload),
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
