import * as React from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { ImImages } from "react-icons/im";
import { GrDocumentText } from "react-icons/gr";
import { FaRegCommentDots } from "react-icons/fa";
import Stack from "@mui/material/Stack";
import ImageUploading from "react-images-uploading";

// import "./Modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function AddPostModal() {
  const name = localStorage.getItem("userName");
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <React.Fragment>
        <Button
          onClick={handleOpen}
          style={{
            color: "black",
          }}
        >
          <FaRegCommentDots />
          Public/Private
        </Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: 500,
              height: 500,
              borderRadius: "1rem",
              marginTop: "10px",
            }}
          >
            <h2 id="child-modal-title">Private/ Public Post</h2>
            <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={() => handleClose()}>CLOSE THIS </Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }

  const names = ["Organisation-1", "Organisation-2", "Organisation-3"];
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <div>
      <Button
        style={{
          marginLeft: "750px",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            width: "500px",
            borderRadius: "1rem",
          }}
          className="post-box"
          sx={style}
        >
          <Typography
            style={{
              fontWeight: "300",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            CREATE A POST
          </Typography>
          <hr />
          <div
            style={{
              display: "flex",
            }}
          >
            <Avatar
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }}
              alt={name}
              src="/static/images/avatar/2.jpg"
            />
            <h2
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }}
            >
              {name}
            </h2>
          </div>

          <input
            style={{
              width: "500px",
              height: "100px",
              marginLeft: "10px",
              border: "none",
            }}
            type="text"
            placeholder="What do you wanna write about?"
          />
          <hr />
          <h2>Upload Image</h2>

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
            style={{
              color: "black",

              marginTop: "20px",
            }}
          >
            <ChildModal />
          </Button>
          <br />
          <Button
            variant="contained"
            style={{
              marginTop: "20px",
            }}
          >
            CREATE
          </Button>
          {/* <Button><GrDocumentText/></Button> */}
        </Box>
      </Modal>
    </div>
  );
}
