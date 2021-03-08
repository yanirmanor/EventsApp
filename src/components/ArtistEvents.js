import { useState } from "react";
import { useProxy } from "valtio";
import { favorite } from "../Store";
import useArtistEvents from "../hooks/useArtistEvents";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import * as dayjs from "dayjs";
import MoreEventData from "./MoreEventData";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function ArtistEvents({ artist }) {
  const classes = useStyles();
  const { data, error, isLoading, isError } = useArtistEvents(artist);
  const { addItem, removeItem } = useProxy(favorite);
  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (id) => {
    const list = { ...expanded, [id]: !expanded[id] };
    setExpanded(list);
  };

  if (isLoading) {
    return <div data-testid="loader">Loading Artist...</div>;
  }

  if (isError) {
    return <div data-testid="error">Error: {error.message}</div>;
  }

  return (
    <div>
      {data
        .filter((item) => item.description !== "")
        .map((ev) => {
          const evDate = `${dayjs(ev.datetime).format("MM/DD/YYYY")}`;
          return (
            <div key={ev.id} style={{ margin: 10 }}>
              <div>
                <span className="mr-3">{ev.description}</span>
                <Chip label={evDate} />
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded[ev.id],
                  })}
                  onClick={() => handleExpandClick(ev.id)}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </div>
              <Collapse
                in={expanded && expanded[ev.id]}
                timeout="auto"
                unmountOnExit
              >
                <MoreEventData ev={ev} />
              </Collapse>
              <div className="m-2 flex">
                <div className="mr-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItem(ev)}
                  >
                    Add
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => removeItem(ev.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
