import { Circles } from 'react-loader-spinner';

const Loader = function () {
    return (
        <Circles
            height="80"
            width="80"
            color="#1E90FF"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
};

export default Loader;