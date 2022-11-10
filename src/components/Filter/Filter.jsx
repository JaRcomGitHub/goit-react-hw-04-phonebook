import css from './Filter.module.css'
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) =>  (
    <div className={css.filterBlock}>
        <p>Find contacts by name</p>
        <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={value}
            onChange={onChange}
        />
    </div>
);

export default Filter;

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
