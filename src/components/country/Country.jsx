import React from "react";
import { useState, useEffect } from "react";
import { FormControl, NativeSelect } from "@material-ui/core";
import styles from "./Country.module.css";
import { getCountries } from "../../api";
const Country = ({ handleChange }) => {
  const [fetchCountry, setFetchCountry] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      setFetchCountry(await getCountries());
    };
    fetchCountries();
  }, [setFetchCountry]);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetchCountry.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Country;
