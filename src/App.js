import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard
} from "@appbaseio/reactivesearch";
import "./App.css";

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="author_seeking"
        credentials="fklIzeRy1:1b89c0dc-d479-47b2-b257-4ea1e3d25eb6"
      >
        <div className="navbar">
          <div className="logo">The Author Seeking App</div>
          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={[
              "title",
              "title.search",
              "firstName",
              "firstName.search"
            ]}
            queryFormat="and"
            placeholder="Search for a title or an author Name"
            innerClass={{
              input: "searchbox",
              list: "suggestionlist"
            }}
            autosuggest={false}
            iconPosition="left"
            filterLabel="search"
          />
        </div>
        <div className={"display"}>
          <div className={"leftSidebar"}>
            <SingleRange
              componentId="ratingsFilter"
              dataField="rank"
              title="Ranking"
              data={[
                { start: 5, end: 5, label: "★★★★ & up" },
                { start: 4, end: 5, label: "★★★★ & up" },
                { start: 3, end: 5, label: "★★★ & up" },
                { start: 2, end: 5, label: "★★ & up" },
                { start: 1, end: 5, label: "★ & up" }
              ]}
              react={{
                and: "mainSearch"
              }}
              filterLabel="Ratings"
            />
            <RangeSlider
              componentId="publishFilter"
              dataField="date"
              title="Year of Publication"
              filterLabel="published"
              range={{
                start: 1970,
                end: 2017
              }}
              rangeLabels={{
                start: "1970",
                end: "2017"
              }}
              interval={2}
            />
            <MultiList
              componentId="authorFilter"
              dataField="firstName.raw"
              title="Authors"
              size={1000}
              showCheckbox={false}
              className="firstName"
              innerClass={{
                list: "author-list"
              }}
              placeholder="Filter by author name"
              filterLabel="Authors"
            />
          </div>
          <div className={"mainBar"}>
            <SelectedFilters />
            <ResultCard
              componentId="results"
              dataField="title"
              react={{
                and: [
                  "mainSearch",
                  "ratingsFilter",
                  "publishFilter",
                  "authorFilter"
                ]
              }}
              pagination={true}
              size={8}
              sortOptions={[
                {
                  dataField: "rank",
                  sortBy: "desc",
                  label: "Ratings (High to low)"
                },
                { dataField: "title.raw", sortBy: "asc", label: "Title A->Z" },
                { dataField: "title.raw", sortBy: "desc", label: "Title Z->A" }
              ]}
              onData={res => ({
                image: res.keywords,
                title: res.title || " ",
                description:
                  res.average_rating +
                  " ★ " +
                  "<span style='float:right;margin-right:5px;'>Pub: " +
                  res.date +
                  "</span><br/><br/><div class='result-author' title='" +
                  res.firstName +
                  "'>by " +
                  res.firstName +
                  "</div>",
                url: "https://google.com/search?q=" + res.title
              })}
              className="result-data"
              innerClass={{
                image: "result-image",
                resultStats: "result-stats"
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default App;
