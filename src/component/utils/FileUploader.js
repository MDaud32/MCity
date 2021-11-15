import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@mui/material';

class FileUpload extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: '',
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };

  handleUploadError = (e) => {
    console.log(e);
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <FileUploader
          accept=''
          name=''
          randomizeFilename
          storageRef={firebase.storage().ref(this.props.dir)}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
        />
      </div>
    );
  }
}

export default FileUpload;
