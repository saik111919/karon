import PropTypes from "prop-types";

const InputField = ({ label, type, register, options, error }) => {
  return (
    <div className='mb-4'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      {type === "select" ? (
        <select
          {...register}
          className='mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black'
        >
          <option value=''>Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register}
          className='mt-1 block w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500'
        />
      )}
      {error && (
        <p className='text-red-500 text-xs mt-1'>{label} is required.</p>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  register: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.object,
};

export default InputField;
