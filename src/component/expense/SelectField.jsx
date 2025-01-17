import PropTypes from "prop-types";

const SelectField = ({ id, label, register, validation, options, error }) => (
  <div className='flex flex-col'>
    <label
      className='block text-gray-700 text-sm font-medium mb-1'
      htmlFor={id}
    >
      {label}
    </label>
    <select
      id={id}
      {...register(id, validation)}
      className='w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out'
    >
      <option value=''>Select a type</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    {error && <p className='mt-1 text-red-500 text-xs'>{error}</p>}
  </div>
);

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
};

export default SelectField;
