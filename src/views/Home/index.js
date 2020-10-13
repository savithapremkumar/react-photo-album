import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchAlbums from "../../actions/fetchAlbums";
import Album from "../../components/Album/index";
import Loader from "../../components/Loader/index";
import Error from "../../components/Error/index";
import { Link } from "react-router-dom";
import { LoadingMessage } from "../../constants/messages";

class Home extends Component {
  shouldComponentRender = () => {
    const { pending } = this.props.album.pending;
    if (pending === false) return false;
    // more tests
    return true;
  };

  render() {
    const { album } = this.props;
    if (!this.shouldComponentRender())
      return <Loader message={LoadingMessage} />;

    return (
      <div>
        <div className="button-container">
          <button
            className="start-button"
            onClick={() => this.props.fetchAlbums()}
          >
            Fetch Albums!
          </button>
        </div>

        <div className="album-list-wrapper">
          {album.error !== null && <Error errorMsg={album.error}></Error>}
          {album.albums !== null &&
            Array.isArray(album.albums) &&
            album.albums.length > 0 && (
              <div>
                {album.albums.map((data, index) => {
                  const albumId = data.id;
                  return (
                    <Link
                      to={{
                        pathname: `/albums/${albumId}/photos`,
                        title: data.title,
                      }}
                      key={index}
                    >
                      <Album
                        title={data.title}
                        username={data.userName}
                      ></Album>
                    </Link>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    album: state.album,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchAlbums: fetchAlbums,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
