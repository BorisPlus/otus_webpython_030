import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
} from "../../constants/actions/index";

export function CloseSideBar() {
//  console.group('actions.sidebar.index.CloseSideBar:');
//  console.groupEnd();
  return dispatch => {
    dispatch(CloseSideBarBegin());
  };
};

export const CloseSideBarBegin = () => ({
  type: CLOSE_SIDEBAR,
  payload: { styleWidth: "0" }
});

export function OpenSideBar() {
//  console.group('actions.sidebar.index.OpenSideBar:');
//  console.groupEnd();
  return dispatch => {
    dispatch(OpenSideBarBegin());
  };
};

export const OpenSideBarBegin = () => ({
  type: OPEN_SIDEBAR,
  payload: { styleWidth: "100%" }
});