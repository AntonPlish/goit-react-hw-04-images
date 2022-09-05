import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = function ({ loadMore }) {
    return (
        <button type="button" onClick={loadMore} className={styles.Button}>
            Load more
        </button>
    );
};

Button.Button = {
    loadMore: PropTypes.func.isRequired,
};

export default Button;