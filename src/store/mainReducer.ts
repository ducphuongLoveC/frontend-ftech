import * as actionTypes from './actions'

interface CustomizationState {
  seek?: number
  isFirstPlayingVideo: boolean
  theme: string
  expandedIndexs: number[]
  isOpen: string[]
  defaultId: string
  fontFamily: string
  borderRadius: number
  opened: boolean
}
export const initialState: CustomizationState = {
  seek: undefined,
  isFirstPlayingVideo: false,
  theme: 'light',
  expandedIndexs: [0],
  isOpen: [],
  defaultId: 'default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 5,
  opened: true,
}

const mainReducer = (state = initialState, action: any) => {
  let id
  switch (action.type) {
    case actionTypes.TOGGLE_THEME:
      console.log(action)
      return {
        ...state,
        theme: action.theme,
      }
    case actionTypes.SET_EXPANDED_INDEXS:
      return {
        ...state,
        expandedIndexs: action.payload,
      }
    case actionTypes.SET_IS_FIRST_PLAYING_VIDEO:
      return {
        ...state,
        isFirstPlayingVideo: action.payload,
      }
    case actionTypes.SET_SEEK:
      return {
        ...state,
        seek: action.payload,
      }
    case actionTypes.MENU_OPEN:
      id = action.id
      return {
        ...state,
        isOpen: [id],
      }
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      }
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily,
      }
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius,
      }
    default:
      return state
  }
}
export default mainReducer
