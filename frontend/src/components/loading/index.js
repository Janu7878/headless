import PropTypes from 'prop-types';
import cx from 'classnames';

const Loading = ( { message, classes, showSpinner, visible } ) => {

  if ( !visible ) {
    return null;
  }

  return (
    <div className={ cx( 'loading-text ml-8', classes ) }>
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="text-gray-600 inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed"
        disabled
      >
        { showSpinner ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        ) : null }
        { message }
      </button>
    </span>
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.string,
  message: PropTypes.string,
  showSpinner: PropTypes.bool,
  visible: PropTypes.bool,
};

Loading.defaultProps = {
  classes: '',
  message: 'Loading...',
  showSpinner: false,
  visible: false,
};

export default Loading;
