import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../interfaces";
import MenuItemCard from "./MenuItemCard";
import { useGetMenuItemsQuery } from "../../../apis/menuItemApi";
import { useDispatch } from "react-redux";
import { setMenuItem } from "../../../storage/redux/menuItemSlice";
import { MainLoader } from "../common";

function MenuItemList() {
  // const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem: menuItemModel, index: number) => (
          <MenuItemCard menuItem={menuItem} key={index}></MenuItemCard>
        ))}
    </div>
  );
}

export default MenuItemList;
