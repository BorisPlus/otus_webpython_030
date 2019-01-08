import {
  OPEN_SIDE_NAV,
  CLOSE_SIDE_NAV,
} from "../../../src/constants/actions/index";

export function CloseSideNav() {
  return dispatch => {
    dispatch(CloseSideNavBegin());
  };
};

export const CloseSideNavBegin = () => ({
  type: CLOSE_SIDE_NAV,
  payload: { styleWidth: "0" }
});

export function OpenSideNav() {
  return dispatch => {
    dispatch(OpenSideNavBegin());
  };
};

export const OpenSideNavBegin = () => ({
  type: OPEN_SIDE_NAV,
  payload: { styleWidth: "100%" }
});