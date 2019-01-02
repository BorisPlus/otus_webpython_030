import {
  OPEN_SIDE_NAV,
  CLOSE_SIDE_NAV,
} from "../../constants/actions/index";

export function CloseSideNav() {
//  console.group('actions.sidebar.index.CloseSideBar:');
//  console.groupEnd();
  return dispatch => {
    dispatch(CloseSideNavBegin());
  };
};

export const CloseSideNavBegin = () => ({
  type: CLOSE_SIDE_NAV,
  payload: { styleWidth: "0" }
});

export function OpenSideNav() {
//  console.group('actions.sidebar.index.OpenSideBar:');
//  console.groupEnd();
  return dispatch => {
    dispatch(OpenSideNavBegin());
  };
};

export const OpenSideNavBegin = () => ({
  type: OPEN_SIDE_NAV,
  payload: { styleWidth: "100%" }
});