import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import InputField from "../../modules/InputField";
import { AddTransactions } from "../../services/services";
import useToast from "../../hooks/useToast";

const ExpenseModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { showToast } = useToast();

  const onSubmit = (data) => {
    AddTransactions(data)
      .then(({ data }) => {
        reset();
        showToast(data.message, "success");
        onClose(true);
      })
      .catch((err) => {
        showToast(
          err?.data?.message || "Something went wrong. Please try again.",
          "error"
        );
      });
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg max-w-full sm:max-w-md lg:max-w-3xl w-full'>
        <div className='border-b-2 flex items-center justify-between p-4'>
          <h2 className='text-xl font-bold text-black'>Add Expense</h2>
          <CgCloseO
            className='cursor-pointer w-10 h-6 text-gray-700 hover:text-gray-900'
            onClick={() => onClose(false)}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='p-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <InputField
              label='Title'
              type='text'
              register={register("title", { required: true })}
              error={errors.title}
            />
            <InputField
              label='Amount'
              type='number'
              register={register("amount", { required: true })}
              error={errors.amount}
            />
            <InputField
              label='Transaction Type'
              type='select'
              register={register("type", { required: true })}
              options={[
                { value: "spent", label: "Spent" },
                { value: "credited", label: "Credited" },
              ]}
              error={errors.type}
            />
          </div>
          <div className='flex flex-col gap-2 md:flex-row md:gap-4 justify-end border-t-2 p-4 border-gray-200'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto'
            >
              Save
            </button>
            <button
              type='button'
              onClick={() => onClose(false)}
              className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full md:w-auto'
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ExpenseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ExpenseModal;
