import React from "react";
import RandomChar from "./randomChar";
import { shallow } from "enzyme";

describe("Testing <RandomChar/>", () => {
  const item = shallow(<RandomChar />);
  describe("Testing <RandomChar/> snap and state", () => {
    it("RandomChar have rendered correctly", () => {
      expect(item).toMatchSnapshot();
    });

    it('RandomChar state "char" is empty object', () => {
      expect(item.state().item).toBeObject();
    });

    it('RandomChar state "loading" is true', () => {
      expect(item.state().loading).toBeTruthy();
    });

    it('RandomChar state "error" is false', () => {
      expect(item.state().error).toBeFalsy();
    });
  });

  describe("Handlers tests", () => {
    it("testing onCharLoaded", () => {
      item.instance().onCharLoded();
      expect(item.state().loading).toBeFalsy();
      expect(item.state().error).toBeFalsy();
    });
    it("testing onError", () => {
      item.instance().onError();
      expect(item.state().loading).toBeFalsy();
      expect(item.state().error).toBeTruthy();
    });
    it("testing upDateChar", () => {
      item.instance().updateChar();
      expect(item.state().loading).toBeFalsy();
    });
  });
});
