// @flow

//import Textfield from '@atlaskit/textfield';
//import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';

import React, { Component } from 'react';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
//import  AbstractUploadPresentationDialog  from  '../AbstractUploadPresentationDialog'
import UploadFilesService from '../../upload-files.service' ;

/**
 * Component that renders the video share dialog.
 *
 * @returns {React$Element<any>}
 */
class UploadPresentationDialog extends Component{

  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
      okDisabled: true
    };

    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
}


  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadFilesService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
          console.log(currentFile);
      })

      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

    render() {
        const { selectedFiles, message } = this.state
        const { t } = this.props;

        return (
            <Dialog
                hideCancelButton = { false }
                okDisabled = { !selectedFiles }
                okKey = { t('dialog.Upload') }
                onSubmit = { this.upload }
                titleKey = { t('dialog.uploadPresentationTitle') }
                width = { 'small' }>
                <form className="modal-dialog-form" id ="modal-dialog-form">
                    <div>
                        <label htmlFor="fileupload">Please Upload Presentation</label>
                        <input className="form-control" type="file" accept=".ppt, .pptx" onChange={this.selectFile}/>
                    </div>
                </form>

                <div className="alert alert-light" role="alert">
                  {message}
                </div>
            </Dialog>
        );
    }

}

export default translate(connect()(UploadPresentationDialog));