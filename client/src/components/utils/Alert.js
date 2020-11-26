import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) => {
  return alerts !== null && alerts.length > 0 ? (
    <div className="alert">
      {alerts.map((alert, index) => (
        <p className={`alt-${alert.alertType}`} key={index}>
          {alert.msg}
        </p>
      ))}
    </div>
  ) : (
    ""
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
