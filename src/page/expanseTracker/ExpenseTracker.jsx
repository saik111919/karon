import ExpenseForm from "../../component/expenseTraker/ExpenseForm";
import useToast from "../../hooks/useToast";
import useTransaction from "../../hooks/useTransaction";
import { DeleteTransactions } from "../../services/services";

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
      <ExpenseForm
        data={data}
        onDeleteExpense={deleteExpense}
        fetchTransactions={fetchTransactions}
      />
    </>
  );
};
export default ExpenseTracker;
