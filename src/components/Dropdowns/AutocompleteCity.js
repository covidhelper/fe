import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React, { useEffect } from "react";
import service from "../../utils/axiosConfig";
import { CITIES } from "../../utils/config";

const filter = createFilterOptions();

const AutocompleteCity = (props) => {
  const [value, setValue] = React.useState("");
  const [cities, setCities] = React.useState(null);

  useEffect(() => {
    service
      .get(CITIES)
      .then((res) => {
        if (res.data.success) {
          let cityCopy = res.data.response.city.filter(
            (c) => c.city.trim() !== ""
          );
          cityCopy = cityCopy.sort((a, b) => (a.city > b.city ? 1 : -1));
          cityCopy = cityCopy.map((c) => `${c.city}`);
          setCities(cityCopy);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    props.changeValue(value);
  }, [value]);

  return (
    cities &&
    cities.length && (
      <Autocomplete
        id="combo-box-demo"
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        options={cities}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} label="City" variant="outlined" />
        )}
      />
    )
  );
};
export default AutocompleteCity;
