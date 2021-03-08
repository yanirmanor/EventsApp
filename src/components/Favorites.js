import { useState } from "react";
import { useProxy } from "valtio";
import { favorite } from "../Store";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  favoriteBtn: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

export default function Favorites() {
  const classes = useStyles();
  const { list, removeItem } = useProxy(favorite);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        aria-label="favorite"
        onClick={handleClickOpen}
        className={classes.favoriteBtn}
      >
        <Badge badgeContent={list.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <div className="text-2xl text-center mb-3 font-semibold">
            My Faviorites
          </div>
          {list.map(({ id, description, artist }) => {
            let name = "unknown";
            let image_url = "";
            if (artist) {
              name = artist.name;
              image_url = artist.image_url;
            }
            return (
              <div
                key={id}
                className="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg"
              >
                <div id="header" className="flex">
                  <img
                    alt="mountain"
                    className="w-32 h-32 md:w-48 md:h-auto rounded-none"
                    src={image_url}
                  />
                  <div id="body" className="flex flex-col ml-5 w-full">
                    <h4 id="name" className="text-xl font-semibold">
                      {name}
                    </h4>
                    <p
                      id="job"
                      className="text-gray-800 my-3 overflow-hidden truncate w-20"
                    >
                      {description}
                    </p>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => removeItem(id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
