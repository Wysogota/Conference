import { makeAutoObservable } from 'mobx';
import { getCountry, getCountries } from '../api';

class CountryStore {
  countries = [];
  country = null;
  isFetching = false;
  error = null;

  constructor () {
    makeAutoObservable(this);
  }

  getOne = (id) => {
    this.isFetching = true;
    this.error = null;
    getCountry(id).then(this.__handleOneSuccess).catch(this.__handleError);
  };

  getAll = () => {
    this.isFetching = true;
    this.error = null;
    getCountries().then(this.__handleAllSuccess).catch(this.__handleError);
  };

  __handleAllSuccess = (res) => {
    this.isFetching = false;
    this.countries = res.data.data;
  };

  __handleOneSuccess = (res) => {
    this.isFetching = false;
    this.country = res.data.data;
  };

  __handleRemoveSuccess = (res) => {
    this.isFetching = false;
    const removedCountryId = res.data.data.id;
    this.countries = this.countries.filter(({ id }) => id !== removedCountryId);
  };

  __handleError = (res) => {
    this.isFetching = false;
    this.error = res.response.data.error;
  };
}

export default new CountryStore();
