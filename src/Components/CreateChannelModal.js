import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/Textfield";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";

const style = {
  position: "absolute",
  top: "55%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateChannelModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div>
      <Button
        style={{
          //   marginTop: "360px",
          //   marginLeft: "670px",
          width: "180px",
          height: "40px",
          marginLeft: "15px",
          //   border: "1px solid black",
          borderRadius: "1rem",
          backgroundColor: "#174B89",
          color: "white",
          fontWeight: 500,
        }}
        onClick={handleOpen}
      >
        Create a Channel{" "}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          style={{
            borderRadius: "0.5rem",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CREATE YOUR CHANNEL
          </Typography>
          <hr />
          <h2>Channel Name-</h2>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="filled-basic"
              label="Enter Name"
              variant="filled"
              style={{
                width: "400px",
              }}
            />
          </Typography>
          <h2>Description-</h2>

          <input
            type="text"
            placeholder="Description..."
            style={{
              height: "200px",
              width: "400px",
              marginTop: "0px",
              border: "1px solid black",
              borderRadius: "0.5rem",
            }}
          />
          <h2>Upload Image-</h2>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            acceptType={["jpg"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <Button
            variant="contained"
            style={{
              marginTop: "20px",
            }}
          >
            CREATE
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
