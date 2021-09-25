import {
  CircularProgress,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { ErrorOutline, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../../components/Card/Card";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import AutocompleteCity from "../../components/Dropdowns/AutocompleteCity";
import ReqType from "../../components/Dropdowns/ReqType";
import service from "../../utils/axiosConfig";
import { FORM_FILL_STRUCTURED } from "../../utils/config";
import Contribute from "../Contribute/Contribute";

const Seek = () => {
  const [params, setParams] = useState({
    city: "",
    type: "",
    query: "",
  });
  const [seeker, setSeeker] = useState(false);
  const [cards, setCards] = useState(null);
  const [seekerCards, setSeekerCards] = useState(null);
  const [giverCards, setGiverCards] = useState(null);
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
    if (uuid !== undefined) {
      setLoading(true);
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
    }
  }, []);

  useEffect(() => {
    if (uuid === undefined) {
      if (!(params.type === "" && params.city === "")) {
        getData();
      }
    }
  }, [params.type, params.city, seeker]);

  useEffect(() => {
    if (params.query.length >= 3) {
      getData();
    }
  }, [params.query]);

  useEffect(() => {
    if (cards && cards.length) {
      const g = cards.filter((c) => c.isGiver);
      const s = cards.filter((c) => !c.isGiver);
      setGiverCards(g);
      setSeekerCards(s);
    } else {
      setGiverCards(null);
      setSeekerCards(null);
    }
  }, [cards]);

  const getData = () => {
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
          if (seeker) {
            setSeekerCards(res.data.response.dataCards);
          } else {
            setGiverCards(res.data.response.dataCards);
          }
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
  };

  const updateCard = (data) => {
    const id = data.uuid;
    let cardCopy = cards;
    cardCopy = cardCopy.map((c) => {
      if (c.uuid !== id) return c;
      else return data;
    });
    setCards(cardCopy);
  };

  return (
    <div className="layout-wrapper">
      <div className="card-wrapper">
        {uuid === undefined ? (
          <>
            <p className="highlight">
              There’s a flood of information available about the
              suppliers/providers/helpers on social media. We aim to create a
              verifiable listing for bridging the gap between seekers and
              givers.
            </p>
            <div className="tabs">
              <span
                onClick={() => setSeeker(false)}
                className={!seeker ? "active" : null}
              >
                Providing Help
              </span>
              <span
                onClick={() => setSeeker(true)}
                className={seeker ? "active" : null}
              >
                Need Help
              </span>
            </div>
            {!cards || cards.length === 0 ? (
              <div className="tell">
                <p>
                  Please select your city / requirement from the dropdown or
                  search to get the data.
                </p>
              </div>
            ) : null}
            <div className="params">
              {/* <City onCityChange={value => setParams({ ...params, city: value })}/> */}
              <AutocompleteCity
                changeValue={(value) => setParams({ ...params, city: value })}
              />
              <ReqType
                onTypeChange={(value) => setParams({ ...params, type: value })}
              />
              <FormControl className="searchbar">
                <InputLabel htmlFor="query">
                  Search by at least 3 characters
                </InputLabel>
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
        {uuid === undefined ? (
          !seeker ? (
            giverCards && giverCards.length ? (
              giverCards.map((c, ind) => {
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
            ) : (
              <div className="sorry">
                <div>
                  <ErrorOutline />
                </div>
                <div>
                  <p>No results found!</p>
                  <p>
                    Please try changing the filters above to get results as per
                    your need.
                  </p>
                </div>
              </div>
            )
          ) : seekerCards && seekerCards.length ? (
            seekerCards.map((c, ind) => {
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
          ) : (
            <div className="sorry">
              <div>
                <ErrorOutline />
              </div>
              <div>
                <p>No results found!</p>
                <p>
                  Please try changing the filters above to get results as per
                  your need.
                </p>
              </div>
            </div>
          )
        ) : null}
        {alert.isOpen && (
          <CustomAlert
            isOpen={alert.isOpen}
            message={alert.message}
            type={alert.type}
          />
        )}
        <div className="loop">
          <p>Do you have some data about trusted COVID suppliers?</p>
          <p>Fill in the form and help the community.</p>
          <Contribute />
        </div>
      </div>
    </div>
  );
};

export default Seek;
