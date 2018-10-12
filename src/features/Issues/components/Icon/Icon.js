import React from "react";
import "./Icon.scss";
import Octicon, { getIconByName } from "@githubprimer/octicons-react";

const Icon = ({ state, pull }) => {
  let icon = "";
  let color = "";
  if (state === "open") {
    if (pull) {
      icon = "git-pull-request";
    } else {
      icon = "issue-opened";
    }
    color = "green";
  } else {
    if (pull) {
      icon = "git-merge";
      color = "purple";
    } else {
      icon = "issue-closed";
      color = "red";
    }
  }
  return (
    <Octicon
      size={"medium"}
      className={`card-icon ${color}`}
      icon={getIconByName(icon)}
    />
  );
};

export default Icon;
