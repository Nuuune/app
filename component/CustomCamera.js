import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Dimensions, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Util from '../Util';

import FIcon from 'react-native-vector-icons/Feather';

const wh = Dimensions.get('window').height;
const ww = Dimensions.get('window').width;

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class CustomCamera extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flash: 'off',
      zoom: 0,
      autoFocus: 'on',
      depth: 0,
      type: 'back',
      whiteBalance: 'auto',
      ratio: '16:9',
      ratios: [],
      photoId: 1,
      showGallery: false,
      photos: [],
      faces: [],
      photoData: ''
    }
  }

  componentWillMount() {
    this.callback = this.props.navigation.state.params.callback;
  }

  componentWillUnmount() {
    this.callback = null;
  }

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
    if (this.camera) {
      this.camera.takePictureAsync({
        width: 720,
        base64: true,
        quality: 0.5
      }).then(data => {
        console.log('data: ', data);
        this.setState({
          photoData: data.base64
        })
      });
    }
  };

  resetPhoto() {
    this.props.navigation.replace('Camera')
  }

  photoOk() {
    // console.log(this);
    this.callback({data: this.state.photoData});
    this.props.navigation.pop()
  }

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={styles.faceText}>ID: {faceID}</Text>
        <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
      </View>
    );
  }

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderFace)}
      </View>
    );
  }

  renderLandmarks() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderLandmarksOfFace)}
      </View>
    );
  }

  renderPhoto() {
    if(this.state.photoData) {
      return (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          alignItems: 'stretch',
          justifyContent: 'flex-end',
        }}>
          <Image source={{uri: `data:image/png;base64,${this.state.photoData}`}} style={{
            position: 'absolute',
            width: ww,
            height: wh
          }} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: Util.px2dp(200),
              position: 'relative'
            }}>
            <TouchableOpacity
              style={[styles.photoBtn, {backgroundColor: '#fff'}]}
              onPress={this.photoOk.bind(this)}
            >
              <Text style={{fontSize: Util.px2dp(34), color: '#0099fc'}}>确定</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.photoBtn, {position: 'absolute', left: 0, height: Util.px2dp(200)}]}
              onPress={this.resetPhoto.bind(this)}
            >
              <Text style={{fontSize: Util.px2dp(34), color: '#eeeeee'}}>重拍</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          alignItems: 'center'
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={this.onFacesDetected}
        onFaceDetectionError={this.onFaceDetectionError}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View
          style={{
            marginTop: 38,
            flex: 1,
            width: '90%',
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              borderLeftWidth: Util.px2dp(7),
              borderLeftColor: '#fff',
              flex: 0.15
            }}>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                paddingLeft: Util.px2dp(8)
              }}>
              <Text style={styles.time}>19:53 <Text style={styles.day}>2018.06.26 星期二</Text></Text>
            </View>
            <View
              style={{
                flex: 0.25,
                paddingLeft: Util.px2dp(8)
              }}>
              <Text style={styles.des}><FIcon name="navigation" size={Util.px2dp(22)} color="#fff" /> 曹杨商务大厦·上海</Text>
            </View>
            <View
              style={{
                flex: 0.25,
                paddingLeft: Util.px2dp(8)
              }}>
              <Text style={styles.des}><FIcon name="user" size={Util.px2dp(22)} color="#fff" /> 张光启</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: Util.px2dp(200)
            }}>
            <TouchableOpacity
              style={[styles.photoBtn]}
              onPress={this.takePicture.bind(this)}
            >
              <FIcon name="camera" size={Util.px2dp(100)} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>


        {this.renderPhoto()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#000',
  },
  navigation: {
    flex: 1,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  galleryButton: {
    backgroundColor: 'indianred',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  time: {
    fontSize: Util.px2dp(50),
    color: '#fff'
  },
  day: {
    fontSize: Util.px2dp(22),
    color: '#fff'
  },
  des: {
    fontSize: Util.px2dp(20),
    color: '#fff'
  },
  photoBtn: {
    width: Util.px2dp(150),
    height: Util.px2dp(150),
    borderRadius: Util.px2dp(75),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
