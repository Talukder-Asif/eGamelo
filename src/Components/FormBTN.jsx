
// eslint-disable-next-line react/prop-types
const FormBTN = ({btnTitle}) => {
    return (
        <button
                type="submit"
                className=" border-2 border-[#1b1d4d] text-white bg-[#1b1d4d] hover:bg-white hover:text-[#1b1d4d] font-medium rounded-lg text-base px-5 mt-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 w-full dark:focus:ring-red-900"
              >
                {btnTitle}
        </button>
    );
};

export default FormBTN;