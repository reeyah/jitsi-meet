// @flow

import type { Dispatch } from 'redux';

import { translate } from '../../../base/i18n';
import { IconUpload} from '../../../base/icons';
import { connect } from '../../../base/redux';
import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox/components';
import { toggleSharedVideo } from '../../actions.any';
import { isUploadedStatus } from '../../functions';

type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Dispatch<any>,

    /**
     * Whether or not the button is disabled.
     */
    _isDisabled: boolean,

    /**
     * Whether or not the local participant is sharing a video.
     */
     _presentationUploaded: boolean
};

/**
 * Implements an {@link AbstractButton} to open the user documentation in a new window.
 */
class UploadPresentationButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.uploadpresentation';
    icon = IconUpload;
    label = 'toolbar.uploadpresentation';
    toggledLabel = 'toolbar.presentationUploaded';

    /**
     * Dynamically retrieves tooltip based on sharing state.
     */
    get tooltip() {
        if (this._isToggled()) {
            return 'toolbar.presentationUploaded';
        }

        return 'toolbar.uploadpresentation';
    }

    /**
     * Required by linter due to AbstractButton overwritten prop being writable.
     *
     * @param {string} value - The value.
     */
    set tooltip(value) {
        return value;
    }

    /**
     * Handles clicking / pressing the button, and opens a new dialog.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
         this._doToggleSharedVideo();
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._presentationUploaded;
    }

    /**
     * Indicates whether this button is disabled or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isDisabled() {
        return this.props._isDisabled;
    }

    /**
     * Dispatches an action to toggle video sharing.
     *
     * @private
     * @returns {void}
     */
    _doToggleSharedVideo() {
        this.props.dispatch(toggleSharedVideo());
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state): Object {
    const {
        disabled: BtnDisabled,
        status: uploadStatus
    } = state['features/shared-video'];

    return {
        _isDisabled: BtnDisabled,
        _presentationUploaded: isUploadedStatus(uploadStatus)
    };
}


export default translate(connect(_mapStateToProps)(UploadPresentationButton));
