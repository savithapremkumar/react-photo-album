import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchPhotos from "../../actions/fetchPhotos";
import Photo from "../../components/Photo/index";
import Loader from "../../components/Loader/index";
import Error from "../../components/Error/index";
import { LoadingMessage } from "../../constants/messages";

class Photos extends Component {
  componentDidMount() {
    const { albumId } = this.props.match.params;
    this.props.fetchPhotos(albumId);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.location.pathname === nextProps.location.pathname &&
      this.props.location.search === nextProps.location.search
    ) {
      // this means that no change in the path, so we don't need to refire the
      // action
      return;
    }

    // if not fire the action
    const { albumId } = this.props.match.params;
    this.props.fetchPhotos(albumId);
  }

  shouldComponentRender = () => {
    const { pending } = this.props.photo.pending;
    if (pending === false) return false;
    // more tests
    return true;
  };

  render() {
    const { photo } = this.props;
    if (!this.shouldComponentRender())
      return <Loader message={LoadingMessage} />;

    return (
      <div className="thumbnail-list-wrapper">
        {photo.error !== null && <Error errorMsg={photo.error}></Error>}
        {photo.photos !== null &&
          Array.isArray(photo.photos) &&
          photo.photos.length > 0 && (
            <div>
              <div className="album-title">{this.props.location.title}</div>
              {photo.photos.map((data, index) => {
                return (
                  <Photo
                    key={index}
                    thumbnailUrl={data.thumbnailUrl}
                    url={data.url}
                    title={data.title}
                  ></Photo>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photo: state.photo,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchPhotos: fetchPhotos,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Photos);
