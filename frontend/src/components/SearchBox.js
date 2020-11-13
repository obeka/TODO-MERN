/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import useStyles from "../styles/material-ui";

export default function Tags(props) {
  const classes = useStyles();
  const {setSelectedTags} = props
  const tagHandler = (event,value) => {
    setSelectedTags(value);
  };
  return (
    <div className={classes.searchBoxContainer}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={tags}
        getOptionLabel={(option) => option}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Filter by tag name"
            placeholder="Add a tag"
          />
        )}
        onChange={(event,value) => tagHandler(event,value)}
      />
    </div>
  );
}
const tags = ["Education", "Shopping", "Work", "Fun", "Concert"];
