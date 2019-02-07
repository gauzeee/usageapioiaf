import React from "react";
import BookPage from "./bookPage";
import CharacterPage from "./chracterPage";
import HousePage from "./housePage";
import { shallow } from "enzyme";

describe("Testing <CharacterPage/>", () => {
  const item = shallow(<CharacterPage />);
  describe("State and snap", () => {
    it("CharacterPage have rendered correctly", () => {
      expect(item).toMatchSnapshot();
    });

    it('CharacterPage state "charId" is eq to 130', () => {
      expect(item.state().charId).toEqual(130);
    });

    it('CharacterPage state "error" is false', () => {
      expect(item.state().error).toBeFalsy();
    });
  });
  describe("Handlers tests", () => {
    it("testing onItemSelected", () => {
      item.instance().onItemSelected();
      expect(item.state().charId).toEqual(item.id);
    });
  });
});

describe("Testing <HousePage/>", () => {
  const item = shallow(<HousePage />);
  describe("State and snap", () => {
    it("HousePage have rendered correctly", () => {
      expect(item).toMatchSnapshot();
    });

    it('HousePage state "houseId" is eq to 130', () => {
      expect(item.state().houseId).toEqual(130);
    });

    it('HousePage state "error" is false', () => {
      expect(item.state().error).toBeFalsy();
    });
  });
  describe("Handlers tests", () => {
    it("testing onItemSelected", () => {
      item.instance().onItemSelected();
      expect(item.state().houseId).toEqual(item.id);
    });
  });
});

describe("Testing <BookPage/>", () => {
  const item = shallow(<BookPage />);
  describe("State and snap", () => {
    it("BookPage have rendered correctly", () => {
      expect(item).toMatchSnapshot();
    });
  });
});
