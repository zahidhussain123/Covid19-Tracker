import React from "react";
import Cards from "./components/cards/Cards";
import Charts from "./components/charts/Charts";
import Country from "./components/country/Country";
import styles from "./App.module.css";
import covid from "./image.png";
import { fetchData } from "./api";
class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }
  handleChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={covid} alt="corona" className={styles.image} />
        <Cards data={data} />
        <Country handleChange={this.handleChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}
export default App;
