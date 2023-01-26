import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component { 
  state = { isError: false };

  static getDerivedStateFromError() {
    return { isError: true };
  }
  
  // componentDidCatch(error, errorInfo) {
  //   console.error(error, errorInfo);
  // }
  
  render() {
    if(this.state.isError)
      return <h1>Oh no... error! Please, refresh!</h1>;

    return <>{this.props.children}</>;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element
}

export default ErrorBoundary;