import { useEffect, useState } from "react";
import { debounceTime, filter, distinctUntilChanged } from "rxjs/operators";
import { Subject } from "rxjs";
import { useSnapshot } from "valtio";
import { favorite } from "../Store";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import Artist from "../components/Artist";
import ArtistEvents from "../components/ArtistEvents";
import Favorites from "../components/Favorites";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  favoriteBtn: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
}));

export default function SearchArtist() {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [query, setSearchQuery] = useState("");
  const [onSearch$] = useState(() => new Subject());
  const { loadFromStorage } = useSnapshot(favorite);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch$.next(event.target.value);
  };

  useEffect(() => {
    const subscription = onSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((query) => query && query.length > 1)
      )
      .subscribe(setSearchQuery);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <div className="container mx-auto">
      <AppBar position="sticky">
        <Toolbar>
          <div className="text-center">Who???s In Town</div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search???"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </Toolbar>
      </AppBar>

      {query && (
        <div>
          <Artist artist={query} />
          <ArtistEvents artist={query} />
        </div>
      )}

      <div>
        <Favorites />
      </div>
    </div>
  );
}
