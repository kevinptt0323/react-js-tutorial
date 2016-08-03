import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingComponent = props => (props.loading ? (<CircularProgress />) : props.children);

export default LoadingComponent;

