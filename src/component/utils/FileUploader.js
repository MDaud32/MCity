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
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ fileURL: url });
      });
    this.props.filename(filename);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImageName,
        fileURL: props.defaultImg,
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        {!this.state.fileURL ? (
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
        ) : null}

        {this.state.isUploading ? (
          <div
            className='progress'
            style={{ textAlign: 'center', margin: '30px 0' }}
          >
            <CircularProgress thickness={7} style={{ color: '#98c6e9' }} />
          </div>
        ) : null}

        {this.state.fileURL ? (
          <div className='image_upload_container'>
            <img
              style={{ width: '100%', cursor: 'pointer' }}
              alt='this is a player'
              src={this.state.fileURL}
            ></img>
            <div className='remove' onClick={() => alert('removed')}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FileUpload;
