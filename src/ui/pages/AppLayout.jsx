// design the layout of the app and use Outlet to render the child components
import { Outlet, useNavigation } from "react-router-dom";

import Header from "../Header";
import Loading from "../Loading";
import CartOverview from "../../features/cart/CartOverview";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";

  console.log("navigation", navigation);

  return (
    <div className="layout">
      <Header />

      {isLoading || isSubmitting ? (
        <Loading />
      ) : (
        // otherwise render the child components
        <Outlet />
      )}

      <CartOverview />
    </div>
  );
}
