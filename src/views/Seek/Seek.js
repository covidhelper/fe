import {
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Card from "../../components/Card/Card";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import City from "../../components/Dropdowns/City";
import ReqType from "../../components/Dropdowns/ReqType";
import service from "../../utils/axiosConfig";
import { FORM_FILL_STRUCTURED } from "../../utils/config";

const Seek = () => {
  const history = useHistory();
  const [params, setParams] = useState({
    city: "",
    type: "",
    query: "",
  });
  const [seeker, setSeeker] = useState(false);
  const [cards, setCards] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });
  const [loading, setLoading] = useState(false);

  const { uuid } = useParams();

  useEffect(() => {
    if (alert.isOpen) {
      setTimeout(() => setAlert({ ...alert, isOpen: false }), 4000);
    }
  }, [alert.isOpen]);

  useEffect(() => {
    console.log(uuid);
    setLoading(true);
    if (uuid !== undefined) {
      service
        .get(`${FORM_FILL_STRUCTURED}/${uuid}`)
        .then((res) => {
          if (res.data.success) {
            setCards([res.data.response.dataCard]);
          } else {
            setAlert({
              ...alert,
              isOpen: true,
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    } else {
      service
        .get(`${FORM_FILL_STRUCTURED}`)
        .then((res) => {
          if (res.data.success) {
            setCards(res.data.response.dataCards);
          } else {
            setAlert({
              ...alert,
              isOpen: true,
              message: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    service
      .get(
        `${FORM_FILL_STRUCTURED}?city=${
          params.city ? params.city : "null"
        }&requestType=${params.type ? params.type : "null"}&q=${
          params.query ? params.query : "null"
        }&isSeeker=${seeker}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setCards(res.data.response.dataCards);
        } else {
          setAlert({
            ...alert,
            isOpen: true,
            message: "Some error eoccured in fetching the data",
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [params]);

  const updateCard = (data) => {
    const id = data.uuid;
    let cardCopy = cards;
    cardCopy = cardCopy.map((c) => {
      if (c.uuid !== id) return c;
      else return data;
    });
    setCards(cardCopy);
  };

  const onAddInfoClick = (e) => {
    e.preventDefault();
    history.push("/add-info");
  };

  return (
    <div className="layout-wrapper">
      <div className="card-wrapper">
        {uuid === undefined ? (
          <>
            <div className="tabs">
              <span
                onClick={() => setSeeker(false)}
                className={!seeker ? "active" : null}
              >
                Suppliers
              </span>
              <span
                onClick={() => setSeeker(true)}
                className={seeker ? "active" : null}
              >
                Seekers
              </span>
            </div>
            <div className="params">
              <City
                onCityChange={(value) => setParams({ ...params, city: value })}
              />
              <ReqType
                onTypeChange={(value) => setParams({ ...params, type: value })}
              />
              <FormControl className="searchbar">
                <InputLabel htmlFor="query">Search</InputLabel>
                <Input
                  id="query"
                  value={params.query}
                  onChange={(e) =>
                    setParams({ ...params, query: e.target.value })
                  }
                  startAdornment={
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </>
        ) : (
          <>
            {cards &&
              cards.map((c, ind) => {
                return (
                  <Card
                    isLink={uuid !== undefined}
                    key={ind}
                    {...c}
                    updateCard={updateCard}
                  />
                );
              })}
          </>
        )}
        {loading && (
          <div className="loading inner-loading">
            <CircularProgress color="primary" />
          </div>
        )}
        {uuid === undefined
          ? !seeker
            ? cards &&
              cards.map((c, ind) => {
                return (
                  c.isGiver && (
                    <Card
                      isLink={uuid !== undefined}
                      key={ind}
                      {...c}
                      updateCard={updateCard}
                    />
                  )
                );
              })
            : cards &&
              cards.map((c, ind) => {
                return (
                  !c.isGiver && (
                    <Card
                      isLink={uuid !== undefined}
                      key={ind}
                      {...c}
                      updateCard={updateCard}
                    />
                  )
                );
              })
          : null}
        {alert.isOpen && (
          <CustomAlert
            isOpen={alert.isOpen}
            message={alert.message}
            type={alert.type}
          />
        )}
        <div className="loop">
          <p>Did not get the data you were looking for?</p>
          <p>
            Become a supplier or a seeker, and get notified whenever new data is
            uploaded, as per your requirements.
          </p>
          <div>
            <button className="btn" onClick={onAddInfoClick}>
              Add Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seek;
