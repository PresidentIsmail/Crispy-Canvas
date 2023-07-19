import { useSelector } from "react-redux";

import Button from "../Button";
import CreateUser from "../../features/user/CreateUser";

function Home() {
  const { username } = useSelector((state) => state.user);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {/* render the createUser form if there is no username */}
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Order now
        </Button>
      )}
    </div>
  );
}

export default Home;
