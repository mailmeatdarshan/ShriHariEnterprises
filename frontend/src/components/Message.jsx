
const Message = ({variant, children}) => {
    const getVariantClass = () => {
        switch (variant) {
            case "success":
                return "bg-green-100 border-green-800";
            case "error":
                return "bg-red-100 border-red-800";
            case "warning":
                return "bg-yellow-100 border-yellow-800";
            case "info":
                return "bg-blue-100 border-blue-800";
            default:
                return "bg-gray-100 border-gray-800";
        }
    };

    return (
        <div className={`p-4 mb-4 text-sm font-medium ${getVariantClass()}`}>
            {children}
        </div>
    );
};

export default Message;
