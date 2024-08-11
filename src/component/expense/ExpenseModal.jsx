import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import { AddTransactions } from "../../services/services";
import useToast from "../../hooks/useToast";
import FormField from "./FormField";
import SelectField from "./SelectField";

const ExpenseModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const addToast = useToast();

  const onSubmit = (data) => {
    AddTransactions(data)
      .then(({ data }) => {
        reset();
        addToast("success", data.message);
        onClose(true);
      })
      .catch((err) => {
        addToast(
          "error",
          err?.data?.message || "Something went wrong. Please try again."
        );
      });
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='relative p-5 w-full max-w-lg bg-white rounded-md shadow-lg'>
        <button
          onClick={() => onClose(false)}
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-500'
        >
          <CgCloseO className='h-6 w-6' />
        </button>
        <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4'>
          Add Expense
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            id='title'
            label='Title'
            register={register}
            validation={{ required: "Title is required." }}
            error={errors.title?.message}
          />
          <FormField
            id='amount'
            label='Amount'
            type='number'
            register={register}
            validation={{ required: "Amount is required." }}
            error={errors.amount?.message}
          />
          <SelectField
            id='type'
            label='Transaction Type'
            register={register}
            validation={{ required: "Type is required." }}
            options={[
              { value: "spent", label: "Spent" },
              { value: "credited", label: "Credited" },
            ]}
            error={errors.type?.message}
          />
          <div className='flex lg:justify-end flex-col sm:flex-row gap-2'>
            <button
              type='submit'
              className='w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Save
            </button>
            <button
              type='button'
              onClick={() => onClose(false)}
              className='w-full sm:w-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
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
