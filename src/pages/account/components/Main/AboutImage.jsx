import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { connect } from "react-redux";
import { GetPictureAbout, UpdatePicture } from "../../actions/mainpage";

function Image(props) {
  const { data, alt } = props;

  return (
    <Grid xs={12} item container justify="center">
      <img width="auto" height="400px" alt={alt} src={`${data}`} />
    </Grid>
  );
}

function AboutImage(props) {
  const { data } = props;

  const [images, setImage] = useState(null);

  useEffect(() => {
    props.GetPicture(1);
    props.GetPicture(2);
  }, []);

  const onFileChange = (e) => {
    e.preventDefault();
    // Update the state
    let reader = new FileReader();
    let file = e.target.files[0];
    let id = e.target.id;
    setImage({ ...images, [id]: file });
  };

  const UploadImages = () => {
    const formData = new FormData();
    for (var key in images) {
      formData.append(key, images[key]);
    }
    props.UpdateImage(formData);
  };

  return (
    <Grid item container justify="center" spacing={3} xs={12}>
      <Grid item container justify="center" spacing={3} xs={6}>
        <Typography variant="h5">Teammate 1</Typography>
        {data.images.image1 === "" ? (
          <Typography variant="h6">No picture uploaded</Typography>
        ) : (
          <Image data={data.images.image1} alt={"Picture1"} />
        )}
        <label htmlFor={"Picture1"}>
          <input
            accept="image/*"
            id={"Picture1"}
            type="file"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
          <Button component="span">Select File</Button>
        </label>
      </Grid>
      <Grid item container justify="center" spacing={3} xs={6}>
        <Typography variant="h5">Teammate 2</Typography>
        {data.images.image2 === "" ? (
          <Typography variant="h6">No picture uploaded</Typography>
        ) : (
          <Image data={data.images.image2} alt={"Picture2"} />
        )}
        <label htmlFor={"Picture2"}>
          <input
            accept="image/*"
            id={"Picture2"}
            type="file"
            style={{ display: "none" }}
            onChange={onFileChange}
          />
          <Button component="span">Select File</Button>
        </label>
      </Grid>
      <Button disabled={images === null} onClick={UploadImages}>
        {data.images.isFetching ? "Loading..." : "Save"}
      </Button>
    </Grid>
  );
}

const mapStateToProps = (state, props) => ({
  data: state.Mainpage["about_us"],
});

const mapDispatchToProps = (dispatch, state) => {
  let GetPicture = (index) => dispatch(GetPictureAbout(index));
  return {
    GetPicture,
    UpdateImage: (image) => dispatch(UpdatePicture(image, "about_us")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutImage);
