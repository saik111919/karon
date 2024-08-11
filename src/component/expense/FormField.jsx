import PropTypes from "prop-types";

const FormField = ({
  id,
  label,
  type = "text",
  register,
  validation,
  error,
}) => (
  <div className='flex flex-col'>
    <label
      className='block text-gray-700 text-sm font-medium mb-1'
      htmlFor={id}
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register(id, validation)}
      className='w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
    />
    {error && <p className='mt-1 text-red-500 text-xs'>{error}</p>}
  </div>
);

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  error: PropTypes.string,
};

export default FormField;
