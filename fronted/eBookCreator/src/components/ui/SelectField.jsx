const SelectField = ({ icon: Icon, label, name, options, ...props }) => {
    return (
        <div className="">
            <label htmlFor={name} className="">
                {label}
            </label>

            <div className="">
                {Icon && (
                    <div className="">
                        <Icon className="" />
                    </div>
                )}

                <select
                    id={name}
                    name={name}
                    {...props}
                    className={`w-full h-11 px-3 py-2 border border-gray-200 rounded-xl ${
                        Icon ? "pl-10" : ""
                    }`}
                >
                    {options.map((option) => (
                        <option
                            key={option.value || option}
                            value={option.value || option}
                        >
                            {option.label || option}
                        </option>
                    ))}
                </select>

                <div className="">
                    <svg
                        className=""
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SelectField;