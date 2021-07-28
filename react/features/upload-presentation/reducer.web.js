// @flow

import { ReducerRegistry } from '../base/redux';

import { RESET_UPLOAD_PPT_STATUS, SET_UPLOAD_PPT_STATUS, RETRY_UPLOAD, SET_UPLOADING, SET_DISABLE_BUTTON } from './actionTypes';

const initialState = {};

/**
 * Reduces the Redux actions of the feature features/shared-video.
 */
ReducerRegistry.register('features/upload-presentation', (state = initialState, action) => {
    const { file, status, ownerId, loading } = action;

    switch (action.type) {
        case SET_DISABLE_BUTTON:
            return {
                ...state,
                disabled
        };

        default:
            return state;
    }
});
