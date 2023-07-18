import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

const Menu = () => {
  const menu = useLoaderData();

  return (
    <div className="layout">
      <h1>Menu</h1>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
};

// make a loader that only fetches the menu from the api
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
