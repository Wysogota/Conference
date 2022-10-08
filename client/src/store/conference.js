import { makeAutoObservable } from 'mobx';
import { createConference, deleteConference, getConference, getConferences, updateConference } from '../api';

class ConferenceStore {
  conferences = [];
  conference = null;
  isFetching = false;
  error = null;

  constructor () {
    makeAutoObservable(this);
  }

  getOne = (id) => {
    getConference(id).then(this.__handleOneSuccess).catch(this.__handleError);
    this.isFetching = true;
  };

  getAll = () => {
    this.isFetching = true;
    getConferences().then(this.__handleAllSuccess).catch(this.__handleError);
  };

  create = (conference) => {
    this.isFetching = true;
    createConference(conference).then(this.__handleOneSuccess).catch(this.__handleError);
  };

  update = (id, conference) => {
    this.isFetching = true;
    updateConference(id, conference).then(this.__handleOneSuccess).catch(this.__handleError);
  };

  remove = (id) => {
    this.isFetching = true;
    deleteConference(id).then(this.__handleRemoveSuccess).catch(this.__handleError);
  };

  __handleAllSuccess = (res) => {
    this.isFetching = false;
    this.conferences = res.data.data;
  };

  __handleOneSuccess = (res) => {
    this.isFetching = false;
    this.conference = res.data.data;
  };

  __handleRemoveSuccess = (res) => {
    this.isFetching = false;
    const removedConferenceId = res.data.data.id;
    this.conferences = this.conferences.filter(({ id }) => id !== removedConferenceId);
  };

  __handleError = (res) => {
    this.isFetching = false;
    this.error = res.response.data.error;
  };
}

export default new ConferenceStore();
