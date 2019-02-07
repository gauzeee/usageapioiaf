import React from "react";
import ItemDetails from "./itemDetails";
import { shallow, mount } from "enzyme";
import gotService from "../../services/gotService";

describe("Testing <ItemDetails/>", () => {
  describe("Testing <ItemDetails/> snap and state", () => {
    const item = shallow(<ItemDetails />);
    it("ItemDetails have rendered correctly", () => {
      expect(item).toMatchSnapshot();
    });

    it('ItemDetailsstate "iten" is null', () => {
      expect(item.state().item).toBeNull();
    });

    it('ItemDetails state "error" is false', () => {
      expect(item.state().error).toBeFalsy();
    });
  });

  describe("Handlers tests", () => {
    const service = new gotService();
    const item = mount(
      <ItemDetails itemId={10} getData={service.getCharacter} />
    );
    it("testing updateItem", () => {
      item.setState({ item: { id: 10 } });
      expect(item.state().item.id).toEqual(10);
      expect(item.state().error).toBeFalsy();
    });
  });
});
