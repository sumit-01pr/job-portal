function Button({

    text,

    onClick,

    type = "button",

    className = "",

    disabled = false

}) {

    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-lg
                hover:bg-blue-700
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
        >

            {text}

        </button>
    )
}

export default Button