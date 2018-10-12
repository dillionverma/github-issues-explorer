import React, { Component } from "react";
import "./Issues.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getIssues, filterIssues } from "./actions";

const maxLength = 50;

const Card = ({ title, body, labels, url }) => (
  <div className="card" onClick={this.issueUrl}>
    <div className="card-title">
      <h4>{title}</h4>
    </div>
    <div className="card-body">
      <div>
        <p>{body && body.substring(0, maxLength)}</p>
      </div>
      {labels && (
        <div>
          <div className="card-labels">
            <ul>
              {labels.map(label => (
                <li key={label.id}>{label.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  </div>
);

const githubUrl = (owner, repo) => `https://github.com/${owner}/${repo}/`;

class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: {},
      owner: "",
      repo: ""
    };
  }

  componentDidMount() {
    let a = this.props.location.pathname.split("/");
    const owner = a[1];
    const repo = a[2];
    this.setState({ owner, repo });
    this.props.getIssues({ owner, repo });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ issues: nextProps.filteredIssues });
    console.log(nextProps.filteredIssues);
  }

  handleFilter = by => {
    this.props.filterIssues(by);
  };
  
  issueUrl = (owner, repo, id) => {
    window.location.href = `https://github.com/${owner}/${repo}/issues/${id}`;
  };

  render() {
    const { owner, repo, issues } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Link to="/">Github Issue Viewer</Link>
          </h1>
          <h4 className="App-url">
            <a href={githubUrl(owner, repo)}>{githubUrl(owner, repo)}</a>
          </h4>
        </header>
        <div className="issues-filters">
          <ul>
            <li
              onClick={() => {
                this.handleFilter("all");
              }}
            >
              All issues
            </li>
            <li
              onClick={() => {
                this.handleFilter("open");
              }}
            >
              Open issues
            </li>
            <li
              onClick={() => {
                this.handleFilter("closed");
              }}
            >
              Closed issues
            </li>
          </ul>
        </div>
        <div className="issues-container">
          {Object.entries(issues).map(([id, issue]) => (
            <div
              onClick={() => {
                this.issueUrl(owner, repo, issue.number);
              }}
            >
              <Card
                key={issue.id}
                title={issue.title}
                body={issue.body}
                labels={issue.labels}
                issueUrl={this.issueUrl}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filteredIssues: state.issues.filteredIssues,
  fetched: state.issues.fetched,
  isLoading: state.issues.isLoading
});

const mapDispatchToProps = dispatch => ({
  getIssues: url => dispatch(getIssues(url)),
  filterIssues: state => dispatch(filterIssues(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issues);
