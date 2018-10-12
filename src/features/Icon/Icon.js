import React from "react";
import Octicon, { getIconByName } from "@githubprimer/octicons-react";

const Icon = ({ state, pull }) => {
  let icon = "";
  if (state === "open") {
    if (pull) {
      icon = "git-pull-request";
    } else {
      icon = "issue-opened";
    }
  } else {
    if (pull) {
      icon = "git-merge";
    } else {
      icon = "issue-closed";
    }
  }
  return <Octicon className={"card-icon"} icon={getIconByName(icon)} />;
};

export default Icon;
