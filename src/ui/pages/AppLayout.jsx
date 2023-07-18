// design the layout of the app and use Outlet to render the child components
import { Outlet, useNavigation } from "react-router-dom";

import Header from "../Header";
import Loading from "../Loading";
import CartOverview from "../../features/cart/CartOverview";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";


  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      {isLoading || (isSubmitting && <Loading />)}

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}
