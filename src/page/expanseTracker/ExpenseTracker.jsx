import useToast from "../../hooks/useToast";
import useTransaction from "../../hooks/useTransaction";
import { DeleteTransactions } from "../../services/services";
import DataTable from "./DataTable";

const ExpenseTracker = () => {
  const { data, LoaderComp, setLoader, fetchTransactions } = useTransaction();
  const { showToast } = useToast();
  function deleteTransactions(id) {
    setLoader(true);
    DeleteTransactions(id)
      .then(({ data }) => {
        fetchTransactions();
        showToast(data.message, "info");
      })
      .catch((err) => {
        showToast(err?.data?.message || "Error Ocured.", "error");
      })
      .finally(() => {
        setLoader(false);
      });
  }

  const deleteExpense = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteTransactions(id);
    }
  };
  return (
    <>
      <LoaderComp />
      ExpenseTracker
      <DataTable data={data} onDeleteExpense={deleteExpense} />
    </>
  );
};
export default ExpenseTracker;
