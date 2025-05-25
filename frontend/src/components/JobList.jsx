import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default JobList;
