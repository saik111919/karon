import { useEffect } from "react";
import useLoader from "../hooks/useLoader";
import ExpenseTrakerCard from "../component/expenseTraker/ExpenseTrakerCard";

const Home = () => {
  const [setLoader, LoaderComp] = useLoader(false);
  useEffect(() => {
    setLoader(false);
  }, []);
  return (
    <>
      <LoaderComp />
      <ExpenseTrakerCard />
    </>
  );
};
export default Home;
