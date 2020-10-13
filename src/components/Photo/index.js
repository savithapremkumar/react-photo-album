import React from "react";

export default class photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
  }

  handleShowDialog = () => {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  };

  render() {
    return (
      <span
        className={this.state.dialogOpen ? `disabled thumbnail` : `thumbnail`}
      >
        <img
          src={this.props.thumbnailUrl}
          alt={this.props.title}
          onClick={this.handleShowDialog}
        ></img>
        {this.state.dialogOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src={this.props.url}
              onClick={this.handleShowDialog}
              alt={this.props.title}
            />
          </dialog>
        )}
      </span>
    );
  }
}
