import { openDialog } from '../base/dialog/actions';
import { UploadPresentationDialog } from '../upload-presentation/components';


export function showUploadPresentationDialog() {
    return openDialog(UploadPresentationDialog);
}

export function toggleSharedVideo() {
    return (dispatch, getState) => {
        const state = getState();
        const { status } = state['features/upload-presentation'];

        if (!([ 'uploaded' ].includes(status))) {
            dispatch(showUploadPresentationDialog());
        }
    };
}
