import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { getPicture, UpdatePicture } from "../../actions/mainpage";

function Image(props) {
  const { data, alt } = props;

  return (
    <Grid xs={12} item container justify="center">
      <img width="auto" height="400px" alt={alt} src={`${data}`} />
    </Grid>
  );
}

function MainImage(props) {
  const { block, data } = props;

  const [image, setImage] = useState(null);

  const onFileChange = (e) => {
    e.preventDefault();
    // Update the state
    let reader = new FileReader();
    let file = e.target.files[0];
    let id = e.target.id;
    const formData = new FormData();
    formData.append(id, file);
    setImage(formData);
  };

  return (
    <Grid item container justify="center" spacing={3} xs={12}>
      {data.image.image === "" ? (
        <Typography variant="h6">No picture uploaded</Typography>
      ) : (
        <Image data={data.image.image} alt={block + "-image"} />
      )}
      <label htmlFor={block + "-image"}>
        <input
          accept="image/*"
          id={block + "-image"}
          type="file"
          style={{ display: "none" }}
          onChange={onFileChange}
        />
        <Button component="span">Select File</Button>
      </label>
      <Button disabled={!image} onClick={() => props.UpdateImage(image)}>
        {data.image.isFetching ? "Loading..." : "Save"}
      </Button>
    </Grid>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage[props.block],
});

const mapDispatchToProps = (dispatch, state) => {
  let GetPicture = () => dispatch(getPicture(state.block));
  GetPicture();
  return {
    GetPicture,
    UpdateImage: (image) => dispatch(UpdatePicture(image, state.block)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainImage);
