import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addFlashMessage } from '../actions/flashMessages';


export default function (WrappedComponent) {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'error',
                    text: 'You need to login to access this page'
                });

                this.context.router.transitionTo('/login');
            }
        }

        componentWillReceiveProps(props, context) {
            //debugger;
            if (!props.isAuthenticated) {
                context.router.transitionTo('/login');
            }
        }

        render() {
            //debugger;
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    }

    Authenticate.contextTypes = {
        router: PropTypes.object
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}

