import React, { Component } from "react";
import "./Issues.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getIssues, filterIssues } from "./actions";
import Icon from "./components/Icon/Icon";
import styled from "styled-components";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const maxLength = 50;

const Card = ({ title, body, labels, issueUrl, owner, repo, number, state, pull_request }) => (
  <div className="card" onClick={() => issueUrl(owner, repo, number)}>
    <div className="card-title">
      <Icon state={state} pull={pull_request} />
      <h4 className={"card-title-text"}>{title}</h4>
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
                <StyledLi key={label.id} color={label.color}>
                  {label.name}
                </StyledLi>
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
      owner: '',
      repo: '',
      filter: 'all',
      page: 1, // By default, page always start at 1
    };
  }

  componentDidMount() {
    const a = this.props.location.pathname.split('/');
    const owner = a[1];
    const repo = a[2];
    this.setState({ owner, repo });
    this.props.getIssues({ owner, repo, page: this.state.page });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ issues: nextProps.filteredIssues });
    console.log(nextProps.filteredIssues);
  }

  handleFilter = (by) => {
    this.props.filterIssues(by);
    this.setState({ filter: by });
  };

  issueUrl = (owner, repo, id) => {
    window.location.href = `https://github.com/${owner}/${repo}/issues/${id}`;
  };

  handlePageChange = (number) => {
    const { owner, repo, page } = this.state;
    const newPage = page + number;

    this.props.getIssues({ owner, repo, page: newPage });
    this.setState({ page: newPage });
  };

  render() {
    const {
      owner, repo, issues, filter,
    } = this.state;
    const { isLoading } = this.props

    if (isLoading) return <LoadingSpinner />

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Link to="/">Github Issue Viewer</Link>
          </h1>
          <h4 className="App-url">
            <a href={githubUrl(owner, repo)}>{githubUrl(owner, repo)}</a>
          </h4>
          <button id="return-button">
            <Link to="/">Go back</Link>
          </button>
        </header>

        <div className="issues-filters">
          <ul>
            <li
              onClick={() => this.handleFilter("all")}
              className={filter === "all" ? "selected" : ""}
            >
              All issues
            </li>
            <li
              onClick={() => this.handleFilter("open")}
              className={filter === "open" ? "selected" : ""}
            >
              Open issues
            </li>
            <li
              onClick={() => this.handleFilter("closed")}
              className={filter === "closed" ? "selected" : ""}
            >
              Closed issues
            </li>
            <li
              onClick={() => this.handleFilter("pull_request")}
              className={filter === "pull_request" ? "selected" : ""}
            >
              Pull Requests
            </li>
          </ul>
        </div>
        <div className="issues-container">
          {Object.entries(issues).map(([id, issue]) => (
            <Card
              key={issue.id}
              title={issue.title}
              body={issue.body}
              labels={issue.labels}
              issueUrl={this.issueUrl}
              owner={owner}
              repo={repo}
              number={issue.number}
              state={issue.state}
              pull_request={issue.pull_request}
            />
          ))}
        </div>
        <div className="paginator">
          {this.state.page > 1 && (
            <button
              className="paginator-button"
              onClick={() => this.handlePageChange(-1)}
            >
              <i className="material-icons">arrow_back_ios</i>
            </button>
          )}
          <span className="page-number">{this.state.page}</span>
          {/* Since GitHub sends 30 issues per page,
              there is no more requests if there are not exactly 30 requests */}
          {Object.keys(this.state.issues).length === 30 && (
            <button
              className="paginator-button"
              onClick={() => this.handlePageChange(1)}
            >
              <i className="material-icons">arrow_forward_ios</i>
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filteredIssues: state.issues.filteredIssues,
  fetched: state.issues.fetched,
  isLoading: state.issues.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getIssues: url => dispatch(getIssues(url)),
  filterIssues: state => dispatch(filterIssues(state)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issues);


const StyledLi = styled.li`
background-color: #${props => props.color};
color: white;
padding: .5em;
border-radius: 5px;
`;
